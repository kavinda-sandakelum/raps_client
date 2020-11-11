import React from 'react';

import AddPolice from './addpolice.component.js';
import RemovePolice from './removepolice.component.js';
import AccidentSubmission from './accidentsubmission.component.js';
import EventSubmission from './eventsubmission.component.js';

export default class Content extends React.Component {

  render(){
    switch (this.props.nav) {
      case "addpolice":
      return (
        <AddPolice token={this.props.token}/>
      )
      case "removepolice":
      return (
        <RemovePolice token={this.props.token}/>
      )
      case "accidentsubmission":
      return (
        <AccidentSubmission token={this.props.token}/>
      )
      case "eventsubmission":
      return (
        <EventSubmission token={this.props.token}/>
      )
      default:
      return(
      <h1>{this.props.nav}</h1>
      )
    }
  }
}
