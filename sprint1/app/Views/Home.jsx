import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { Component } from "react";

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.button}>
					<Button
						title="Set Locations"
						onPress={() => this.props.navigation.navigate("Location Settings")}
					/>
				</View>

				<View style={styles.button}>
					<Button
						title="Set Times"
						onPress={() => this.props.navigation.navigate("Time Settings")}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title="Location Set Map (TEMP)"
						onPress={() => this.props.navigation.navigate("Location Set Map")}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		width: "70%",
		marginBottom: 10,
		marginTop: 10,
	},
});
