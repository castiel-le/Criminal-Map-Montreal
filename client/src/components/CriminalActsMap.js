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
    await this.fetchMap();
  }

  onClose() {
    this.setState({
      activeCrimePoint: null,
    });
  }

  async fetchMap(){
    // eslint-disable-next-line max-len
    let response = await fetch("/case/all");
    let fullData = await response.json();
    if (fullData.statusCode === 404){
      console.log(fullData.statusCode);
      return; 
    }
    let tempArr = [];
    fullData.map((item, index) => {
      tempArr.push(item);
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
      </MapContainer>
    );
  }

}