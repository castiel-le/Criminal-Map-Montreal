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
import CrimeTooltip from "./CrimeTooltip";
import MapMove from "./MapMove";

export default class CriminalActsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crimePoints:  [],
      activeCrimePoint: null,
    };
    this.fetchMap = this.fetchMap.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  async componentDidMount(){
    let tempArr = await this.fetchMap();
    this.setState({
      crimePoints: tempArr
    })
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.bounds !== this.props.bounds) {
      let newCrimePoints = await this.fetchMap();
      this.setState({
        crimePoints: newCrimePoints,
      });
    }
  }

  onClose() {
    this.setState({
      activeCrimePoint: null,
    });
  }

  async fetchMap() {
    let allBounds = this.props.bounds.toBBoxString().split(",");
    // eslint-disable-next-line max-len
    console.log(allBounds);
    // eslint-disable-next-line max-len
    let response = await fetch(`/case/area/?neLon=${allBounds[2]}&neLat=${allBounds[3]}&swLon=${allBounds[0]}&swLat=${allBounds[1]}`);
    // eslint-disable-next-line max-len
    console.log(`/case/area/?neLon=${allBounds[2]}&neLat=${allBounds[3]}&swLon=${allBounds[0]}&swLat=${allBounds[1]}`);
    let fullData = await response.json();
    console.log(fullData)
    if (fullData.statusCode === 404){
      console.log(fullData.statusCode);
      return; 
    }
    let tempArr = [];
    fullData.map((item, index) => {
      tempArr.push(item);
    });
    return tempArr;
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
              center={[item.Geo.coordinates[1], item.Geo.coordinates[0]]} 
              eventHandlers={{
                click: () => {
                  this.setState({ activeCrimePoint: item });
                },
              }
              }/>
          )}
        </MarkerClusterGroup>
        {
          this.state.activeCrimePoint !== null ? 
            // eslint-disable-next-line max-len
            <Popup position={[this.state.activeCrimePoint.Geo.coordinates[1], this.state.activeCrimePoint.Geo.coordinates[0]]} onClose={this.onClose} >
              <CrimeTooltip selected={this.state.activeCrimePoint}/>
            </Popup> : null
        }
        <MapMove action={this.props.action}/>
      </MapContainer>
    );
  }

}