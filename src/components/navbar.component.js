import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    if(adminRights){
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">Road Accident Prevention System</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

            <li className="navbar-item">
              <a onClick={()=>this.props.handleNavigation("addpolice")} className="nav-link">Add User</a>
            </li>

            <li className="navbar-item">
              <a onClick={()=>this.props.handleNavigation("removepolice")} className="nav-link">Remove User</a>
            </li>

            <li className="navbar-item">
              <a onClick={()=>this.props.handleNavigation("accidentsubmission")} className="nav-link">Accident Submission</a>
            </li>

            </ul>
            <ul className="navbar-nav navbar-right">
            <button onClick={this.LogOut.bind(this,token)} className="navbar-item nav-link btn btn-secondary">Log out</button>
            </ul>

          </div>
        </nav>
      );
    }
    else{
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

          <Link to="/" className="navbar-brand">Road Accident Prevention System</Link>
          <div className="collpase navbar-collapse"
          >
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <a onClick={()=>this.props.handleNavigation("accidentsubmission")} className="nav-link">Accident Submission</a>
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
}
