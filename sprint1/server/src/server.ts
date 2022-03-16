import express from "express";

import {
	Client,
	DirectionsRequest,
	LatLng,
	TravelMode,
} from "@googlemaps/google-maps-services-js";

const app = express();
const client = new Client({});

require("dotenv").config();

const brightonLoc: LatLng = [50.817978, -0.136562];
const londonLoc: LatLng = [51.502963, -0.112584];

const directionsReq: DirectionsRequest = {
	params: {
		key: process.env.GOOGLE_MAPS_API_KEY!,
		origin: brightonLoc,
		destination: londonLoc,
		mode: TravelMode.transit,
	},
};

app.get("/get-data", (req, res) => {
	client.directions(directionsReq).then((response) => {
		res.json(response.data);
	});
});

app.get("/ping", (req, res) => {
	res.send("pong");
});

app.listen(process.env.PORT, () => {
	console.log(`Server opened on port ${process.env.PORT}`);
});
