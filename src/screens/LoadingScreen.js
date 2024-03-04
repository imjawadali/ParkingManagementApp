import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { AppColor } from "../constants";

function LoadingScreen() {
    return (
        <View style={styles.Container}>
            <ActivityIndicator size="large" color={AppColor} />
            <Text style={styles.Text}>Fetching movies . . .</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    marginTop: 10,
    color: 'black'
  }
});

export default LoadingScreen