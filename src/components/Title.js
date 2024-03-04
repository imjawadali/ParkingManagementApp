import React from "react";
import { StyleSheet, Text } from "react-native";
import { Black } from "../constants";


export default function Title({ style, title }) {
    return (
        <Text style={[ styles.Title, style ]}>{title}</Text>
    )
}

const styles = StyleSheet.create({
  Title: {
    color: Black,
    fontSize: 30,
    fontWeight: 'bold'
  }
});