import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

export default class CriminalActsMap extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div>
        <MapContainer
          center={this.props.config.center}
          zoom={this.props.config.initialZoom}
          zoomControl={false}
          style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: -1, }}
          updateWhenZooming={false}
          updateWhenIdle={true}
          preferCanvas={true}
          minZoom={this.props.config.minZoom}
          maxZoom={this.props.config.maxZoom}
        >
          <TileLayer
            attribution={this.props.config.attribution}
            url={this.props.config.tileUrl}
          />

          <MarkerClusterGroup
            spiderfyOnMaxZoom={false}
            zoomToBoundsOnClick={true}
            showCoverageOnHover={true}
            removeOutsideVisibleBounds={false}
            disableClusteringAtZoom={18}>
            {this.points.map((item, index) =>
              <CircleMarker
                key={index}
                color={"red"}
                opacity={1}
                radius={5}
                weight={1}
                center={[item[0], item[1]]} />
            )}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    );
  }

}