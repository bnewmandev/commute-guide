"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const app = (0, express_1.default)();
const client = new google_maps_services_js_1.Client({});
require("dotenv").config();
const brightonLoc = [50.817978, -0.136562];
const londonLoc = [51.502963, -0.112584];
const directionsReq = {
    params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        origin: brightonLoc,
        destination: londonLoc,
        mode: google_maps_services_js_1.TravelMode.transit,
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
