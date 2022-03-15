const express = require("express");
const {
	Client,
	LatLng,
	TravelMode,
} = require("@googlemaps/google-maps-services-js");

const app = express();
const client = new Client({});

require("dotenv").config();

const brightonLoc = [50.817978, -0.136562];
const londonLoc = [51.502963, -0.112584];

const args = {
	params: {
		key: process.env.GOOGLE_MAPS_API_KEY,
		origin: brightonLoc,
		destination: londonLoc,
		mode: TravelMode.transit,
	},
};

client.directions(args).then((res) => {
	console.log(res.data.routes[0].legs[0].steps[1].transit_details.line);
});

app.get("/ping", (req, res) => {
	res.send("pong");
});

app.listen(process.env.PORT, () => {
	console.log(`Server opened on port ${process.env.PORT}`);
});
