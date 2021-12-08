/* eslint-disable security/detect-object-injection */
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
    this.state = {
      crimePoints:  [],
      activeCrimePoint: null,
    };
    this.fetchMap = this.fetchMap.bind(this);
  }

  async componentDidMount(){
    await this.fetchMap();
  }

  async fetchMap(){
    let response = await fetch("/case/area/?neLon=-73.59350681304932&neLat=45.51729363571138&swLon= -73.57385158538818&swLat=45.52700557610431");
    let fullData = await response.json();
    if (fullData.statusCode === 404){
      console.log(fullData.statusCode);
      return; 
    }
    let tempArr = [];
    fullData.map((item, index) => {
      let coordArr = [item.Geo.coordinates[1], item.Geo.coordinates[0]];
      tempArr.push(coordArr);
    });
    this.setState({
      crimePoints : tempArr
    })
  }

  render() {
    return (
      <MapContainer
        center={this.props.config.startCenter}
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
          {this.state.crimePoints.map((item, index) =>
            <CircleMarker
              key={index}
              color={"red"}
              opacity={1}
              radius={5}
              weight={1}
              center={[item[0], item[1]]} 
              eventHandlers={{
                click: () => {
                  this.setState({ activeCrimePoint: item });
                },
              }
              }/>
          )}
        </MarkerClusterGroup>
      </MapContainer>
    );
  }

}