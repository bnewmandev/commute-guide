import React from "react";
import { Component } from "react";
import MapView, { Marker, LatLng } from "react-native-maps";
import {
	Button,
	Dimensions,
	StyleSheet,
	View,
	TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

export default class MapSavedLocations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			granted: false,
			location: null,
			mapRef: React.createRef(),
			errorMsg: null,
			workLoc: { latitude: 0, longitude: 0 },
			homeLoc: { latitude: 0, longitude: 0 },
		};
	}

	componentDidMount() {
		(async () => {
			const homeLocData = await AsyncStorage.getItem(
				"@user_input_home_location"
			);
			const homeLoc = homeLocData != null ? JSON.parse(homeLocData) : null;

			const workLocData = await AsyncStorage.getItem(
				"@user_input_work_location"
			);
			const workLoc = workLocData != null ? JSON.parse(workLocData) : null;

			this.setState({
				homeLoc: {
					latitude: homeLoc.latitude,
					longitude: homeLoc.longitude,
				},
				workLoc: {
					latitude: workLoc.latitude,
					longitude: workLoc.longitude,
				},
			});
		})();
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					ref={this.state.mapRef}
					showsMyLocationButton
					showsUserLocation
					mapPadding={{ top: 50, right: 0, bottom: 100, left: 20 }}
				>
					<Marker
						title="Home"
						draggable
						onDragEnd={async (e) => {
							console.log("dragEnd", e.nativeEvent.coordinate);
							this.setState({ homeLoc: e.nativeEvent.coordinate });
							await AsyncStorage.setItem(
								"@user_input_home_location",
								JSON.stringify(e.nativeEvent.coordinate)
							);
						}}
						coordinate={this.state.homeLoc}
						pinColor="rgb(255, 0, 0)"
					/>
					<Marker
						title="Work"
						draggable
						onDragEnd={async (e) => {
							console.log("dragEnd", e.nativeEvent.coordinate);
							this.setState({ workLoc: e.nativeEvent.coordinate });
							await AsyncStorage.setItem(
								"@user_input_work_location",
								JSON.stringify(e.nativeEvent.coordinate)
							);
						}}
						coordinate={this.state.workLoc}
						pinColor="rgb(0, 0, 255)"
					/>
				</MapView>
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
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	overlay: {
		position: "absolute",
		bottom: 50,
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
});
