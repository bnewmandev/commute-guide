import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import WeekdayPicker from "react-native-weekday-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SetLocations from "./Views/SetLocations";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			global: {},
		};
	}
	render() {
		const Stack = createNativeStackNavigator();
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={SetLocations} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
