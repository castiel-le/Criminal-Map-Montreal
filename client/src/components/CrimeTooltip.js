/**
 * Display information for the popup of the object being clicked on
 * @author Castiel Le & Nael Louis
 */

/* eslint-disable max-len */
import {Component} from "react";

export default class CrimeTooltip extends Component {
  /**
   * Constructor of the class
   * @param props 
   */
  constructor(props) {
    super(props)
    //initialize the state
    this.state = {
      crime: "",
    }
    this.fetchDocument = this.fetchDocument.bind(this);
  }

  /**
   * Call fetchDocument in the life cycle when the component is mounted
   */
  async componentDidMount() {
    await this.fetchDocument();
  }

  /**
   * fetch info of the object from server
   * @returns 
   */
  async fetchDocument() {
    let response = await fetch(`/case/${this.props.selected._id}`);
    let data = await response.json();
    if (data.statusCode === 404) {
      console.log(data.statusCode);
      return;
    }
    this.setState({ crime: data });
    console.log(this.state.crime);
  }

  /**
   * Render the info on the map
   * @returns 
   */
  render() {
    return (
      <div>
        <p><b>{this.state.crime.CATEGORIE}</b></p>
        <p>{this.state.crime.DATE}, {this.state.crime.QUART}</p>
        <p>PDQ: {this.state.crime.PDQ}</p>
      </div>
    );
  }
}