/**
 * Parameter configuration for the map
 * @author Castiel Le & Nael Louis
 */

/* eslint-disable max-len */
import L from "leaflet";

/**
 * Settings bound of the object that map move return
 */
var corner1 = L.latLng(45.48312315370178, -73.59496593475342);
var corner2 = L.latLng(45.48677882152415, -73.5858678817749);
var bounds = L.latLngBounds(corner1, corner2);

/**
 * Configuration of the entire map
 */
let configs = {
  attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
  tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  startCenter: [45.50321887154943, -73.60462188720703],
  startBounds: bounds,
  initialZoom: 16,
  minZoom: 14,
  maxZoom: 18
};

export default configs;
