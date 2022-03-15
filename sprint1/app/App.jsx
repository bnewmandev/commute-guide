import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import WeekdayPicker from "react-native-weekday-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SetLocations from "./Views/SetLocations";
import SetTimes from "./Views/SetTimes";
import Home from "./Views/Home";

export default class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const Stack = createNativeStackNavigator();
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Location Settings" component={SetLocations} />
					<Stack.Screen name="Time Settings" component={SetTimes} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
