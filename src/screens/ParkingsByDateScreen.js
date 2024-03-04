import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'

import { BASE_URL, Black, END_POINTS, White } from "../constants";
import LoadingScreen from "./LoadingScreen";
import { getDuration } from "../helpers";

function ParkingsByDateScreen() {

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [parkingsList, setParkingsList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getParkingsByDate(date)
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
            setParkingsList([])
          } else if (json.data.length)
            setParkingsList(json.data)
          else {
            setParkingsList([])
            Alert.alert('Error', 'No parkings record found')
          }
        })
        .catch(error => {
          console.error({ error });
          setLoading(false)
        });
    }
  }

  return (
    <ScrollView style={styles.ScrollContainer}>
      <TouchableOpacity style={styles.Date} onPress={() => setOpen(true)}>
          <Text style={styles.DateText}>{date.toDateString()}</Text>
        </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          getParkingsByDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
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
  Date: {
    flex: 1,
    marginTop: 10,
    backgroundColor: White,
    borderWidth: 1,
    borderColor: Black,
    borderRadius: 10,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  DateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    color: Black
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