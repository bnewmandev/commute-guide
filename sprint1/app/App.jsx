import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MultiSelect from "react-native-multiple-select";
import { MaterialIcons } from "@expo/vector-icons";

const days = [
	{
		name: "Monday",
		id: 0,
	},
	{
		name: "Tuesday",
		id: 1,
	},
	{
		name: "Wednesday",
		id: 2,
	},
	{
		name: "Thursday",
		id: 3,
	},
	{
		name: "Friday",
		id: 4,
	},
	{
		name: "Saturday",
		id: 5,
	},
	{
		name: "Sunday",
		id: 6,
	},
];

const items = [
	{
		name: "Days of Week",
		id: 100,
		children: [
			{
				name: "Monday",
				id: 0,
			},
			{
				name: "Tuesday",
				id: 1,
			},
			{
				name: "Wednesday",
				id: 2,
			},
			{
				name: "Thursday",
				id: 3,
			},
			{
				name: "Friday",
				id: 4,
			},
			{
				name: "Saturday",
				id: 5,
			},
			{
				name: "Sunday",
				id: 6,
			},
		],
	},
];

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			homeLocation: "",
			workLocation: "",
			savedHL: "",
			savedWL: "",
			timeOne: new Date(),
			timeTwo: new Date(),
			showPickerOne: false,
			showPickerTwo: false,
			selectedItems: [],
		};
	}

	componentDidMount() {
		getLocations().then((locations) => {
			this.setState({ savedHL: locations.savedHL, savedWL: locations.savedWL });
		});
	}

	updateLocations() {
		if (this.state.homeLocation) {
			this.setState({ savedHL: this.state.homeLocation, homeLocation: "" });
		}
		if (this.state.workLocation) {
			this.setState({ savedWL: this.state.workLocation, workLocation: "" });
		}
		storeLocations({
			savedHL: this.state.savedHL,
			savedWL: this.state.savedWL,
		}).then(() => console.log("Saved"));
	}

	onSelectedItemsChange = (selectedItems) => {
		this.setState({ selectedItems });
		console.log("Selected Items: ", selectedItems);
	};

	render() {
		const { selectedItems } = this.state;
		return (
			<View style={styles.container}>
				<Text>Please enter your home location: </Text>
				<TextInput
					value={this.state.homeLocation}
					onChangeText={(text) => this.setState({ homeLocation: text })}
					style={styles.input}
					placeholder="Postcode"
				/>
				<Button
					onPress={() => this.setState({ showPickerOne: true })}
					title="Set leaving house time"
				/>
				<Text />
				<Text>Please enter your work location: </Text>
				<TextInput
					value={this.state.workLocation}
					onChangeText={(text) => this.setState({ workLocation: text })}
					style={styles.input}
					placeholder="Postcode"
				/>
				<Button
					onPress={() => this.setState({ showPickerTwo: true })}
					title="Set leaving work time"
				/>
				<Text />

				<Button
					onPress={() => this.updateLocations()}
					title="Update Changes"
					style={styles.spacerOne}
				/>

				<Text style={styles.spacerOne}>Current Locations: </Text>
				<Text>Home: {this.state.savedHL}</Text>
				<Text>Work: {this.state.savedWL}</Text>
				<Text style={styles.spacerOne}>Current Times: </Text>
				<Text>
					Home: {this.state.timeOne.getHours()}:
					{this.state.timeOne.getMinutes()}
				</Text>
				<Text>
					Work: {this.state.timeTwo.getHours()}:
					{this.state.timeTwo.getMinutes()}
				</Text>

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
				<SectionedMultiSelect
					items={days}
					IconRenderer={MaterialIcons}
					uniqueKey={"id"}
					// subKey={"children"}
					selectText={"Select Days"}
					showDropDowns={true}
					readOnlyHeadings={true}
					onSelectedItemsChange={this.onSelectedItemsChange}
					selectedItems={this.state.selectedItems}
					hideSearch={true}
				/>
				<View style={styles.multiSelectContainer}>
					<MultiSelect
						items={days}
						uniqueKey="id"
						onSelectedItemsChange={this.onSelectedItemsChange}
						selectedItems={selectedItems}
						selectText="Pick Items"
						searchInputPlaceholderText="Search Items..."
						onChangeInput={(text) => console.warn(text)}
						tagRemoveIconColor="#CCC"
						tagBorderColor="#CCC"
						tagTextColor="#CCC"
						selectedItemTextColor="#CCC"
						selectedItemIconColor="#CCC"
						itemTextColor="#000"
						displayKey="name"
						searchInputStyle={{ color: "#CCC" }}
						submitButtonColor="#CCC"
						submitButtonText="Submit"
					/>
				</View>
				<StatusBar style="auto" />
			</View>
		);
	}
}

const storeLocations = async (value) => {
	const jsonValue = JSON.stringify(value);
	await AsyncStorage.setItem("saved_locations", jsonValue, (e) => {
		if (e) {
			console.log(e);
		}
	});
};

const getLocations = async () => {
	const jsonValue = await AsyncStorage.getItem("saved_locations");
	return jsonValue != null ? JSON.parse(jsonValue) : null;
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
