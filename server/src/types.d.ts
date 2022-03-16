import { LatLng } from "@googlemaps/google-maps-services-js";

export interface RequestParams {
	username: string;
	access_code: string;
	origin: LatLng;
	destination: LatLng;
	arrive_by?: number;
	depart_at?: number;
}
