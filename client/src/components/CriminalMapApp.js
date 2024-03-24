/**
 * Main application for the map
 * @author Castiel Le & Nael Louis
 */

import { Component } from "react";
import configs from '../utils/config';
import CriminalActsMap from './CriminalActsMap';

export default class CriminalMapApp extends Component {
  /**
   * Constructor for the class
   * @param props 
   */
  constructor(props) {
    super(props);
    //initialize the state
    this.state = {
      bounds: configs.startBounds,
    }
    this.onMove = this.onMove.bind(this);
  }
   
  /**
   * Callback method for the hook
   * @param newBounds 
   */
  onMove(newBounds) {
    this.setState({
      bounds: newBounds,
    });
  }

  /**
   * Render the map with point in the corresponding bound
   * @returns
   */
  render() {
    return (
      <CriminalActsMap action={this.onMove} config={configs} bounds={this.state.bounds}/>
    )
  }

}