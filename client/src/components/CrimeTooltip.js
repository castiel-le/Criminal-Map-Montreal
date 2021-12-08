/* eslint-disable max-len */
import React, {Component} from "react";

export default class CrimeTooltip extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p><b>{this.props.selected.CATEGORIE}</b></p>
        <p>{this.props.selected.DATE}, {this.props.selected.QUART}</p>
        <p>PDQ: {this.props.selected.PDQ}</p>
      </div>
    );
  }
}