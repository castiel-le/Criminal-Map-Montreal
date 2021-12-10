/**
 * Main map for the application
 * @author Castiel Le & Nael Louis
 */

/* eslint-disable max-len */
import { Component } from "react";
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
  /**
   * Constructor of the class
   * @param props 
   */
  constructor(props) {
    super(props);
    //initialize the state
    this.state = {
      crimePoints:  [],
      activeCrimePoint: null,
    };
    this.fetchMap = this.fetchMap.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  /**
   * Call fetchMap in the life cycle when the component is mounted and set state with fetched data
   */
  async componentDidMount(){
    let tempArr = await this.fetchMap();
    this.setState({
      crimePoints: tempArr
    })
  }

  /**
   * Call fetch upon update in the life cycle and set state with the new fetched data
   * @param prevProps 
   */
  async componentDidUpdate(prevProps) {
    if (prevProps.bounds !== this.props.bounds) {
      let newCrimePoints = await this.fetchMap();
      this.setState({
        crimePoints: newCrimePoints,
      });
    }
  }

  /**
   * Close the popup
   */
  onClose() {
    this.setState({
      activeCrimePoint: null,
    });
  }

  /**
   * fetch the object array in the corresponding area from server
   * @returns 
   */
  async fetchMap() {
    let allBounds = this.props.bounds.toBBoxString().split(",");
    console.log(allBounds);
    let response = await fetch(`/case/area/?neLon=${allBounds[2]}&neLat=${allBounds[3]}&swLon=${allBounds[0]}&swLat=${allBounds[1]}`);
    console.log(`/case/area/?neLon=${allBounds[2]}&neLat=${allBounds[3]}&swLon=${allBounds[0]}&swLat=${allBounds[1]}`);
    let fullData = await response.json();
    console.log(fullData)
    if (fullData.statusCode === 404){
      console.log(fullData.statusCode);
      return; 
    }
    let tempArr = [];
    fullData.map((item) => {
      tempArr.push(item);
    });
    return tempArr;
  }

  /**
   * Display the main map for the application
   * @returns 
   */
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
            <Popup position={[this.state.activeCrimePoint.Geo.coordinates[1], this.state.activeCrimePoint.Geo.coordinates[0]]} onClose={this.onClose} >
              <CrimeTooltip selected={this.state.activeCrimePoint}/>
            </Popup> : null
        }
        <MapMove action={this.props.action}/>
      </MapContainer>
    );
  }

}