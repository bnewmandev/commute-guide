import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from "react";

import LocationInput from "./Components/LocationInput";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Please enter your home location: </Text>
      <LocationInput />
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
