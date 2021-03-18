import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import logo from "../icons/icon.png";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Dropdown, NavLink, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faUserPlus, faPlus, faAmbulance, faCarCrash, faListAlt, faExclamationTriangle, faEnvelopeOpenText, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default class Navbar2 extends Component {
  constructor(props) {
    super(props);

    this.LogOut = this.LogOut.bind(this);
  }

  LogOut(t) {
    console.log("logged out");
    //window.location.reload(true);

    axios
      .get("http://localhost:5000/police/logout/", { params: { token: t } })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);

        //refresh page

        if (window.location.href.substr(-2) !== "?r") {
          window.location = window.location.href + "?r";
        }
      });
  }

  render() {
    const adminRights = this.props.adminRights;
    const token = this.props.token;

    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="d-flex">
        <Navbar.Brand>
          <img src={logo} width="30" height="30" className="d-inline-block align-top"/>
          &nbsp; Road Accident Prevention System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-center" fill variant="pills">
          <Dropdown as={NavItem} style={{ display: adminRights ? "block" : "none" }}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faUser} />&nbsp;
              Police
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <a onClick={() => this.props.handleNavigation("addpolice")} className="dropdown-item">
                  <FontAwesomeIcon icon={faUserPlus} />&nbsp;
                  Add User
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a onClick={() => this.props.handleNavigation("policelist")} className="dropdown-item">
                  <FontAwesomeIcon icon={faListAlt} />&nbsp;
                  User List
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={NavItem} style={{ display: adminRights ? "block" : "none" }}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faAmbulance} />&nbsp;
              Emergency Teams
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <a onClick={() => this.props.handleNavigation("addeteam")} className="dropdown-item">
                  <FontAwesomeIcon icon={faUserPlus} />&nbsp;
                  Add Emergency Team
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a onClick={() => this.props.handleNavigation("removeeteam")} className="dropdown-item">
                  <FontAwesomeIcon icon={faListAlt} />&nbsp;
                  Emergency Team List
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faCarCrash} />&nbsp;
              Accidents
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <a onClick={() => this.props.handleNavigation("accidentsubmission")} className="dropdown-item">
                  <FontAwesomeIcon icon={faPlus} />&nbsp;
                  Accident Submission
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a onClick={() => this.props.handleNavigation("accidentlist")} className="dropdown-item">
                  <FontAwesomeIcon icon={faListAlt} />&nbsp;
                  Accident List
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>
            <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
              Events
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <a onClick={() => this.props.handleNavigation("eventsubmission")} className="dropdown-item">
                  <FontAwesomeIcon icon={faPlus} />&nbsp;
                  Event Submission
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a onClick={() => this.props.handleNavigation("eventlist")} className="dropdown-item">
                  <FontAwesomeIcon icon={faListAlt} />&nbsp;
                  Event List
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

            <div as={NavItem} className="my-auto">
              <a onClick={() => this.props.handleNavigation("incidentlist")} className="nav-link">
                <FontAwesomeIcon icon={faEnvelopeOpenText} />&nbsp;
                Incidents
              </a>
            </div>

          </Nav>
          <Nav className="ml-auto">
            <div as={NavItem}>
                <a
                  onClick={this.LogOut.bind(this, token)}
                  className="btn btn-outline-danger text-secondary"
                >
                <FontAwesomeIcon icon={faSignOutAlt} /> Log out
                </a>
            </div>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}
