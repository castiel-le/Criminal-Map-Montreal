import L from "leaflet";

var corner1 = L.latLng(45.48312315370178, -73.59496593475342);
var corner2 = L.latLng(45.48677882152415, -73.5858678817749);
var bounds = L.latLngBounds(corner1, corner2);
let configs = {
  // eslint-disable-next-line max-len
  attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
  tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  startCenter: [45.50321887154943, -73.60462188720703],
  startBounds: bounds,
  initialZoom: 14,
  minZoom: 12,
  maxZoom: 18
};

export default configs;
