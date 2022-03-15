import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import WeekdayPicker from "react-native-weekday-picker";

export default class SetTimes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timeOne: new Date(),
			timeTwo: new Date(),
			showPickerOne: false,
			showPickerTwo: false,
			days: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 0, 0: 0 },
		};
	}

	render() {
		const { selectedItems } = this.state;
		return (
			<View style={styles.container}>
				<Button
					onPress={() => this.setState({ showPickerOne: true })}
					title="Set leaving house time"
				/>
				<Text />
				<Button
					onPress={() => this.setState({ showPickerTwo: true })}
					title="Set leaving work time"
				/>
				<Text />
				<Text>Select workdays:</Text>
				<WeekdayPicker
					days={this.state.days}
					onChange={(days) => this.setState({ days: days })}
				/>
				<Text />
				<Button title="Update" onPress={() => storeTimes(this.state)} />
				{this.state.showPickerOne && (
					<DateTimePicker
						value={this.state.timeOne}
						mode="time"
						onChange={(e, time) => {
							this.setState({ showPickerOne: false });
							this.setState({ timeOne: time });
						}}
					/>
				)}
				{this.state.showPickerTwo && (
					<DateTimePicker
						value={this.state.timeTwo}
						mode="time"
						onChange={(e, time) => {
							this.setState({ showPickerTwo: false });
							this.setState({ timeTwo: time });
						}}
					/>
				)}
				<StatusBar style="auto" />
			</View>
		);
	}
}

const storeTimes = async (state) => {
	const data = {
		timeOne: state.timeOne,
		timeTwo: state.timeTwo,
		days: state.days,
	};
	const stringData = JSON.stringify(data);
	await AsyncStorage.setItem("@user_input_times", stringData);
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
