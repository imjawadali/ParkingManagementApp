import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";

import { BASE_URL, Black, END_POINTS, White } from "../constants";
import LoadingScreen from "./LoadingScreen";
import { getDuration } from "../helpers";

function ParkingsByDateScreen() {

  const [parkingsList, setParkingsList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getParkingsByDate('2024-03-04')
  }, [])

  const getParkingsByDate = (date) => {
    if (date) {
      setLoading(true)
      fetch(BASE_URL + END_POINTS.getTotalParkingsByDate + `?date=${date}`, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
          setLoading(false)
          if (json.error) {
            Alert.alert('Error', json.error)
          } else if (json.data.length)
            setParkingsList(json.data)
        })
        .catch(error => {
          console.error({ error });
          setLoading(false)
        });
    }
  }

  return (
    <ScrollView style={styles.ScrollContainer}>
      <View style={styles.RowContainer}>
        <Text style={styles.RowHeading}>Slot #</Text>
        <Text style={[styles.RowHeading, {
          flex: 1, textAlign: 'center'
        }]}>Vehicles</Text>
        <Text style={[styles.RowHeading, {
          flex: 1, textAlign: 'center'
        }]}>Time</Text>
        <Text style={[styles.RowHeading, {
          flex: 1, textAlign: 'center'
        }]}>Amount</Text>
      </View>
      {loading && !parkingsList.length
        ? <LoadingScreen />
        : parkingsList.map(slot => {
          return (
            <View key={slot.slotNumber} style={styles.RowContainer}>
              <Text style={[styles.RowData, {
                flex: 1, textAlign: 'center'
              }]}>{slot.slotNumber}</Text>
              <Text style={[styles.RowData, {
                flex: 2, textAlign: 'center'
              }]}>{slot.totalVehicles.toString()}</Text>
              <Text style={[styles.RowData, {
                flex: 2, textAlign: 'center'
              }]}>{getDuration(slot.totalMinutes)}</Text>
              <Text style={[styles.RowData, {
                flex: 2, textAlign: 'center'
              }]}>{slot.amountCharged.toString()}Rs.</Text>
            </View>
          )
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ScrollContainer: {
    flex: 1,
    backgroundColor: White,
    paddingHorizontal: 10
  },
  RowContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Black,
    marginTop: 10,
    paddingBottom: 5
  },
  RowHeading: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  RowData: {
    fontSize: 14,
    fontWeight: '400'
  }
});

export default ParkingsByDateScreen