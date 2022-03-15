import React from "react";
import { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import {
	Button,
	Dimensions,
	StyleSheet,
	View,
	TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";

export default class LocationSetMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			granted: false,
			location: null,
			mapRef: React.createRef(),
			errorMsg: null,
		};
	}

	componentDidMount() {
		// (async () => {
		// 	let { status } = await Location.requestForegroundPermissionsAsync();
		// 	if (status !== "granted") {
		// 		this.setState({ errorMsg: "Permission to access location was denied" });
		// 		return;
		// 	}
		//
		// 	let location = await Location.getCurrentPositionAsync({});
		// 	console.log(location);
		// 	this.setState({ location: location });
		// })();
	}

	goToMyLocation() {
		const coords = this.state.location.coords;
		this.state.mapRef.current.animateCamera({
			center: { latitude: coords.latitude, longitude: coords.longitude },
		});
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
				/>
				<TouchableOpacity style={styles.overlay}>
					<Button title="Set Home Location" />
				</TouchableOpacity>
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
