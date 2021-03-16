import React, { Component } from "react";
import axios from "axios";

const Incident = (props) => (
  <tr>
    <td>
      {props.incident.datetime.match(/\d+-\d+-\d+/)}
      <br />
      {props.incident.datetime.match(/\d\d:\d\d/)}
    </td>
    <td>{props.incident.reporterName}</td>
    <td>{props.incident.incidentType}</td>
    <td>{props.incident.weather}</td>
    <td>{props.incident.vehicleType}</td>
    <td>{props.incident.drivingSide}</td>
    <td>{props.incident.severity}</td>
    <td>{props.incident.kmPost}</td>
    <td>{props.incident.suburb}</td>
    <td>{props.incident.operatedSpeed}</td>
    <td>{props.incident.incidentDescription}</td>
    <td>{props.incident.sessionToken}</td>
    <td>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => {
          props.deleteEvent(props.event.id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class ValidateIncident extends Component {
  constructor(props) {
    super(props);

    this.deleteIncident = this.deleteIncident.bind(this);

    this.state = { incidentlist: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/incident/list")
      .then((response) => {
        this.setState({ incidentlist: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteIncident(id) {
    axios
      .delete("http://localhost:5000/incident/delete/", {
        data: { id: id, sessionToken: this.props.token },
      })
      .then((response) => {
        console.log("id:", id);
        console.log(response.data);
      });

    this.setState({
      incidentlist: this.state.incidentlist.filter((el) => el.id !== id),
    });
  }

  incidentlist() {
    return this.state.incidentlist.map((currentIncident) => {
      return (
        <Incident
          incident={currentIncident}
          deleteIncident={this.deleteIncident}
          key={currentIncident.id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Incident List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date/Time</th>
              <th>reporterName</th>
              <th>incidentType</th>
              <th>weather</th>
              <th>vehicleType</th>
              <th>drivingSide</th>
              <th>severity</th>
              <th>kmPost</th>
              <th>Suburb</th>
              <th>operatedSpeed</th>
              <th>incidentDescription</th>
            </tr>
          </thead>
          <tbody>{this.incidentlist()}</tbody>
        </table>
      </div>
    );
  }
}
