import express from "express";

import {
	Client,
	DirectionsRequest,
	LatLng,
	TravelMode,
} from "@googlemaps/google-maps-services-js";

import { RequestParams } from "./types";

import * as auth from "../authdata.json";

const app = express();
const client = new Client({});

require("dotenv").config();

app.use(express.json());

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

app.post("/find-route", (req, res) => {
	const data: RequestParams = req.body;
	if (data.username in auth["users"]) {
		// @ts-ignore
		const user = auth["users"][data.username];
		if (data.access_code === user.access_code) {
			client
				.directions({
					params: {
						key: process.env.GOOGLE_MAPS_API_KEY!,
						origin: data.origin,
						destination: data.destination,
						arrival_time: data.arrive_by,
						departure_time: data.depart_at,
						mode: TravelMode.transit,
					},
				})
				.then((response) => {
					return res.json(response.data);
				});
		} else {
			return res.status(401).send("UNAUTHORIZED - INVALID ACCESS CODE");
		}
	} else {
		return res.status(403).send("UNAUTHENTICATED");
	}
});

app.get("/ping", (req, res) => {
	res.send("pong");
});

app.listen(process.env.PORT, () => {
	console.log(`Server opened on port ${process.env.PORT}`);
});
