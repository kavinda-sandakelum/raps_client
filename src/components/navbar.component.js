import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import logo from "../icon.png";

export default class Navbar extends Component {
  constructor(props){
    super(props);

    this.LogOut = this.LogOut.bind(this);
  }

  LogOut(t){
    console.log("logged out");
    //window.location.reload(true);

    axios.get("http://localhost:5000/police/logout/",{params:{token:t}})
        .then(response => response.data)
        .then(data => {
            console.log(data);

            //refresh page

            if (window.location.href.substr(-2) !== '?r') {
                window.location = window.location.href + '?r';
            }

            })

  }


  render() {
    const adminRights = this.props.adminRights;
    const token = this.props.token;

      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand"><img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          &nbsp; Road Accident Prevention System</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

            <li className="navbar-item" style={{display: adminRights ? 'block' : 'none' }}>
              <a onClick={()=>this.props.handleNavigation("addpolice")} className="nav-link">Add User</a>
            </li>

            <li className="navbar-item" style={{display: adminRights ? 'block' : 'none' }}>
              <a onClick={()=>this.props.handleNavigation("removepolice")} className="nav-link">Remove User</a>
            </li>

            <li className="navbar-item" style={{display: adminRights ? 'block' : 'none' }}>
              <a onClick={()=>this.props.handleNavigation("addeteam")} className="nav-link">Add Emergency Team</a>
            </li>

            <li className="navbar-item" style={{display: adminRights ? 'block' : 'none' }}>
              <a onClick={()=>this.props.handleNavigation("removeeteam")} className="nav-link">Remove Emergency Team</a>
            </li>

            <li className="navbar-item">
              <a onClick={()=>this.props.handleNavigation("accidentsubmission")} className="nav-link">Accident Submission</a>
            </li>

            <li className="navbar-item">
              <a onClick={()=>this.props.handleNavigation("accidentlist")} className="nav-link">Accident List</a>
            </li>

            <li className="navbar-item">
              <a onClick={()=>this.props.handleNavigation("eventsubmission")} className="nav-link">Event Submission</a>
            </li>

            <li className="navbar-item">
              <a onClick={()=>this.props.handleNavigation("eventlist")} className="nav-link">Event List</a>
            </li>

            </ul>
            <ul className="navbar-nav navbar-right">
            <button onClick={this.LogOut.bind(this,token)} className="navbar-item nav-link btn btn-secondary">Log out</button>
            </ul>

          </div>
        </nav>
      );
  }
}
