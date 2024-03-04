import React from "react";
import { StyleSheet, View } from "react-native";
import { Grey } from "../constants";


export default function Separator() {
  return (
    <View style={styles.Separator} />
  )
}

const styles = StyleSheet.create({
  Separator: {
    width: '100%',
    height: 1,
    borderRadius: 10,
    backgroundColor: Grey,
    marginVertical: 10
  }
});