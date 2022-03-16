"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const auth = __importStar(require("./authdata.json"));
const app = (0, express_1.default)();
const client = new google_maps_services_js_1.Client({});
require("dotenv").config();
app.use(express_1.default.json());
app.post("/find-route", (req, res) => {
    const data = req.body;
    if (data.username in auth["users"]) {
        // @ts-ignore
        const user = auth["users"][data.username];
        if (data.access_code === user.access_code) {
            client
                .directions({
                params: {
                    key: process.env.GOOGLE_MAPS_API_KEY,
                    origin: data.origin,
                    destination: data.destination,
                    arrival_time: data.arrive_by,
                    departure_time: data.depart_at,
                    mode: google_maps_services_js_1.TravelMode.transit,
                },
            })
                .then((response) => {
                return res.json(response.data);
            });
        }
        else {
            return res.status(401).send("UNAUTHORIZED - INVALID ACCESS CODE");
        }
    }
    else {
        return res.status(403).send("UNAUTHENTICATED");
    }
});
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.listen(process.env.PORT, () => {
    console.log(`Server opened on port ${process.env.PORT}`);
});
