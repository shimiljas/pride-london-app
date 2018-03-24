// @flow
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import formatDate from "date-fns/format";
import {
  eventListBgColor,
  priceTagBgColor,
  imageBgColor,
  cardBgColor,
  textColor,
  lightNavyBlue,
  white,
  eventCardShadow
} from "../constants/colors";
import Text from "./Text";

type Props = {
  name: string,
  locationName: string,
  eventPriceLow: number,
  eventPriceHigh: number,
  startTime: string,
  endTime: string,
  imageUrl: string,
  isFree: boolean
};
const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);
const getEventPrice = (isFree, eventPriceLow, eventPriceHigh) => {
  let displayPrice;
  if (isFree) {
    displayPrice = "Free";
  } else if (eventPriceLow === eventPriceHigh) {
    displayPrice = `£${eventPriceLow}`;
  } else {
    displayPrice = `From £${eventPriceLow}`;
  }
  return displayPrice;
};

const EventCard = ({
  name,
  locationName,
  startTime,
  endTime,
  imageUrl,
  eventPriceLow,
  eventPriceHigh,
  isFree
}: Props) => {
  const eventStartTime = removeTimezoneFromDateString(startTime);
  const eventEndTime = removeTimezoneFromDateString(endTime);
  const timeFormat = "HH:mm";
  const timeDisplay = `${formatDate(eventStartTime, timeFormat)} - ${formatDate(
    eventEndTime,
    timeFormat
  )}`;

  return (
    <View style={styles.eventCard}>
      <ImageBackground
        style={styles.imageContainer}
        source={{ uri: imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.eventPriceContainer}>
          <Text style={styles.eventPrice}>
            {getEventPrice(isFree, eventPriceLow, eventPriceHigh)}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.eventCardDetails}>
        <Text style={styles.eventTime}>{timeDisplay}</Text>
        <View style={styles.eventNameContainer}>
          <Text type="h3" style={styles.eventName}>
            {name}
          </Text>
        </View>
        <Text style={styles.eventLocation}>{locationName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    height: 108,
    backgroundColor: cardBgColor,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 5
  },
  imageContainer: {
    width: 114,
    height: 108
  },
  eventPriceContainer: {
    height: 23,
    backgroundColor: lightNavyBlue,
    position: "absolute",
    paddingHorizontal: 8,
    borderRadius: 2
  },
  eventCardDetails: {
    flex: 1,
    padding: 8
  },
  eventNameContainer: {
    flexDirection: "row"
  },
  eventName: {
    color: lightNavyBlue,
    paddingTop: 4
  },
  eventPrice: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    color: white,
    lineHeight: 20
  },
  eventTime: {
    fontSize: 14,
    lineHeight: 20,
    color: lightNavyBlue
  },
  eventLocation: {
    fontSize: 12,
    lineHeight: 16,
    paddingTop: 4,
    color: lightNavyBlue
  }
});

export default EventCard;
