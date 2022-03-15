import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

export default class SetLocations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			homeLocation: "",
			workLocation: "",
		};
	}

	componentDidMount() {
		fetchLocations().then((data) => {
			this.setState({
				homeLocation: data.homeLocation,
				workLocation: data.workLocation,
			});
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Please enter your home location: </Text>
				<TextInput
					value={this.state.homeLocation}
					onChangeText={(text) => this.setState({ homeLocation: text })}
					style={styles.input}
					placeholder="Postcode"
				/>
				<Text />
				<Text>Please enter your work location: </Text>
				<TextInput
					value={this.state.workLocation}
					onChangeText={(text) => this.setState({ workLocation: text })}
					style={styles.input}
					placeholder="Postcode"
				/>
				<Button title="Update" onPress={() => storeLocations(this.state)} />
				<StatusBar style="auto" />
				<FlashMessage position="top" />
			</View>
		);
	}
}

const storeLocations = async (state) => {
	const data = {
		homeLocation: state.homeLocation,
		workLocation: state.workLocation,
	};
	const stringData = JSON.stringify(data);
	await AsyncStorage.setItem("@user_input_locations", stringData, (error) => {
		if (error) {
			showMessage({
				message: error.message,
			});
		} else {
			showMessage({
				message: "Locations updated successfully",
			});
		}
	});
};

const fetchLocations = async () => {
	const stringData = await AsyncStorage.getItem("@user_input_locations");
	return stringData != null ? JSON.parse(stringData) : null;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	input: {
		width: "90%",
		height: 40,
		textAlign: "center",
		borderWidth: 1,
		marginBottom: 20,
	},

	spacerOne: {
		marginTop: 30,
		marginBottom: 10,
	},
	multiSelectContainer: {
		height: 200,
		width: "80%",
	},
});
