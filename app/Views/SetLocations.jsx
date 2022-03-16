import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import * as Location from "expo-location";

export default class SetLocations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			homeLocation: null,
			workLocation: null,
			granted: false,
			location: null,
			mapRef: React.createRef(),
			errorMsg: null,
		};
	}

	componentDidMount() {
		fetchLocations().then((data) => {
			this.setState({
				homeLocation: data[0],
				workLocation: data[1],
			});
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.spacerOne}>
					<Button
						title="Set Current Location as Home"
						onPress={async () => {
							let { status } =
								await Location.requestForegroundPermissionsAsync();
							if (status !== "granted") {
								this.setState({
									errorMsg: "Permission to access location was denied",
								});
								return;
							}

							let location = await Location.getCurrentPositionAsync({});

							await AsyncStorage.setItem(
								"@user_input_home_location",
								JSON.stringify(location.coords),
								(error) => {
									if (error) {
										showMessage({
											message: error.message,
										});
									} else {
										showMessage({
											message: "Home location updated successfully",
										});
									}
								}
							);
						}}
					/>
				</View>
				<View>
					<Button
						title="Set Current Location as Work"
						onPress={async () => {
							let { status } =
								await Location.requestForegroundPermissionsAsync();
							if (status !== "granted") {
								this.setState({
									errorMsg: "Permission to access location was denied",
								});
								return;
							}
							let location = await Location.getCurrentPositionAsync({});

							await AsyncStorage.setItem(
								"@user_input_work_location",
								JSON.stringify(location.coords),
								(error) => {
									if (error) {
										showMessage({
											message: error.message,
										});
									} else {
										showMessage({
											message: "Work location updated successfully",
										});
									}
								}
							);
						}}
					/>
				</View>

				<Text />
				<StatusBar style="auto" />
				<FlashMessage position="top" />
			</View>
		);
	}
}

const fetchLocations = async () => {
	const homeLocData = await AsyncStorage.getItem("@user_input_home_location");
	const homeLoc = homeLocData != null ? JSON.parse(homeLocData) : null;

	const workLocData = await AsyncStorage.getItem("@user_input_work_location");
	const workLoc = workLocData != null ? JSON.parse(workLocData) : null;

	return [homeLoc, workLoc];
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
		marginTop: 20,
		marginBottom: 20,
	},
	multiSelectContainer: {
		height: 200,
		width: "80%",
	},
});
