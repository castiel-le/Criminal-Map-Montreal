/* eslint-disable max-len */
import {Component} from "react";

export default class CrimeTooltip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crime: "",
    }
    this.fetchDocument = this.fetchDocument.bind(this);
  }

  async componentDidMount() {
    await this.fetchDocument();
  }

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