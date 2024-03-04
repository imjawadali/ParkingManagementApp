import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text, Alert } from "react-native";

import { AppColor, BASE_URL, Black, END_POINTS, White } from "../constants";
import LoadingScreen from "./LoadingScreen";

function OverViewScreen({ navigation }) {

  const [text, setText] = useState('')
  const [slotsList, setSlotsList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllSlots()
  }, [])

  const onPark = (vehicleNumber) => {
    if (text) {
      fetch(BASE_URL + END_POINTS.parkCar, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vehicleNumber })
      })
        .then(response => response.json())
        .then(json => {
          if (json.error) {
            Alert.alert('Error', json.error)
          } else if (json.message) {
            setText('')
            getAllSlots()
            Alert.alert('Success', json.message)
          }
        })
        .catch(error => {
          console.error({ error });
        });
    }
  }

  const onUnpark = (vehicleNumber, slotNumber) => {
    if (vehicleNumber) {
      fetch(BASE_URL + END_POINTS.unparkCar, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vehicleNumber, slotNumber })
      })
        .then(response => response.json())
        .then(json => {
          if (json.error) {
            Alert.alert('Error', json.error)
          } else if (json.data) {
            console.log({ data: json.data })
            setText('')
            getAllSlots()
            Alert.alert('Success',
              `Vehicle unparked \n Duration: ${json.data.duration.hours}h ${json.data.duration.minutes}m \n Amount charged: ${json.data.amountCharged}Rs.`)
          }
        })
        .catch(error => {
          console.error({ error });
        });
    }
  }

  const getAllSlots = () => {
    setLoading(true)
    fetch(BASE_URL + END_POINTS.getAllSlots, { method: 'GET' })
      .then(response => response.json())
      .then(json => {
        setLoading(false)
        if (json.error) {
          Alert.alert('Error', json.error)
        } else if (json.data.length)
          setSlotsList(json.data)
      })
      .catch(error => {
        console.error({ error });
        setLoading(false)
      });
  }

  const onChangeMaintenanceMode = (slotNumber, status) => {
    fetch(BASE_URL + END_POINTS.changeMaintenanceMode, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slotNumber, status })
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          Alert.alert('Error', json.error)
        } else if (json.message) {
          getAllSlots()
          Alert.alert('Success', json.message)
        }
      })
      .catch(error => {
        console.error({ error });
      });
  }

  return (
    <View style={styles.Container}>
      <TextInput placeholder='Enter car number here' style={styles.TextBox} value={text} onChangeText={(text) => setText(text)} />
      <View style={styles.ButtonsContainer}>
        <TouchableOpacity style={styles.Button} onPress={() => onPark(text)}>
          <Text style={styles.ButtonText}>Park</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity style={styles.Button} onPress={() => onUnpark(text)}>
          <Text style={styles.ButtonText}>Unpark</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.ListContainer}>
        <View style={styles.RowContainer}>
          <Text style={[styles.RowHeading, {
            flex: 1
          }]}>Slot #</Text>
          <Text style={[styles.RowHeading, {
            flex: 4, textAlign: 'center'
          }]}>Vehicle #</Text>
          <Text style={[styles.RowHeading, {
            flex: 2, textAlign: 'center'
          }]}>Action</Text>
        </View>
        {loading && !slotsList.length
          ? <LoadingScreen />
          : slotsList.map(slot => {
            return (
              <View key={slot.slotNumber} style={styles.RowContainer}>
                <Text style={[styles.RowData, {
                  flex: 1
                }]}>{slot.slotNumber}</Text>
                <Text style={[styles.RowData, {
                  flex: 4, textAlign: 'center'
                }]}>{slot.vehicleNumber || "-"}</Text>
                <View style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                  {slot.vehicleNumber
                    ? <TouchableOpacity style={{}} onPress={() => onUnpark(slot.vehicleNumber, slot.slotNumber)}>
                      <Text style={[styles.RowData, { color: AppColor }]}>Unpark</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity style={{}} onPress={() => onChangeMaintenanceMode(slot.slotNumber, !slot.isUnderMaintenance)}>
                      <Text style={[styles.RowData, {
                        textAlign: 'center',
                        color: slot.isUnderMaintenance ? 'red' : 'green'
                      }]}>{slot.isUnderMaintenance ? 'Maintenance' : 'Active'}</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            )
          })}
        <TouchableOpacity style={{ width: '100%', marginTop: 15 }} onPress={() => navigation.navigate('ParkingsByDate')}>
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Show parkings by date</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: White,
    display: 'flex',
    flexDirection: 'column'
  },
  TextBox: {
    borderWidth: 1,
    borderColor: Black,
    borderRadius: 10,
    width: '100%',
    height: 40,
    padding: 5
  },
  ButtonsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  Button: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Black,
    borderRadius: 10,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonText: {
    color: 'white',
    fontSize: 16
  },
  ListContainer: {
    width: '100%',
    paddingVertical: 15
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

export default OverViewScreen