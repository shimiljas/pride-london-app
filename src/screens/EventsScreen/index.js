// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { createSelector } from "reselect";
import type { State } from "../../reducers";
import type {
  EventCategoryName,
  SavedEvents,
  EventDays
} from "../../data/event-deprecated";
import { updateData } from "../../actions/data";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import {
  groupEventsByStartTime,
  selectFilteredEventsDeprecated
} from "../../selectors/events-deprecated";
import { selectData } from "../../selectors";
import { selectLoading, selectRefreshing } from "../../selectors/data";
import Component from "./component";

type StateProps = {
  events: EventDays,
  savedEvents: SavedEvents,
  loading: boolean,
  refreshing: boolean,
  selectedCategories: Set<EventCategoryName>
};

type DispatchProps = {
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  updateData: () => Promise<void>
};

type Props = StateProps & DispatchProps;

const getDataLoading = createSelector([selectData], selectLoading);

const getDataRefreshing = createSelector([selectData], selectRefreshing);

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State): StateProps => ({
  events: groupEventsByStartTime(selectFilteredEventsDeprecated(state)),
  savedEvents: state.savedEvents,
  loading: getDataLoading(state),
  refreshing: getDataRefreshing(state),
  selectedCategories: state.eventFilters.selectedFilters.categories
});

const mapDispatchToProps = {
  updateData,
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<StateProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
