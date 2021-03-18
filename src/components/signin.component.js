import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./css/signin.component.css";
import { Container, Row, Col } from "react-bootstrap";
import SVGsign from "../Assets/signin1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import { getFromStorage, setInStorage } from "../utils/storage";

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
    this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
    this.onSignin = this.onSignin.bind(this);

    this.state = {
      isLoading: true,
      token: "",
      signInError: "",
      signInUsername: "",
      signInPassword: "",
      validUsername: false,
      validPassword: false,
      activateSubmit: false,
    };
  }

  componentDidMount() {
    const token = getFromStorage("road_accident_prevention_system_webtoken");

    if (token) {
      //verify token
      try {
        axios
          .get("http://localhost:5000/police/verifysession?token=" + token)
          .then((res) => res.data)
          .then((json) => {
            if (json.success) {
              this.setState({
                token: token,
                isLoading: false,
              });
            } else {
              this.setState({
                isLoading: false,
              });
            }
          });
      } catch (err) {
        console.log(err);
        this.setState({ isLoading: false });
      }
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInPassword,
      activateSubmit,
    } = this.state;

    if (isLoading) {
      return (
        <div className="d-flex justify-content-center ">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (!token) {
      return (
        <div className="content">
          <div className="background">
            <div className="form-button">
              <Container>
                <Row>
                  <Col>
                    <Row>
                      <h3>Road Accident Prevention System</h3>
                    </Row>
                    <img className="sign-img" src={SVGsign} />
                  </Col>
                  <Col>
                    <div className="form-one">
                      <form className=" col-12   p-5 ">
                        <h3>Welcome Back!</h3>
                        <h6>Login to continue</h6>

                        <div className="form-group">
                          <tr>
                            <td>
                              <FontAwesomeIcon
                                className="icons"
                                icon={faUser}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="forminput"
                                value={signInUsername}
                                onChange={this.onTextboxChangeUsername}
                                placeholder="Username"
                              ></input>
                            </td>
                          </tr>
                        </div>

                        <div className="form-group">
                          <tr>
                            <td>
                              <FontAwesomeIcon
                                className="icons"
                                icon={faLock}
                              />
                            </td>
                            <td>
                              <input
                                type="password"
                                className="forminput"
                                value={signInPassword}
                                onChange={this.onTextboxChangePassword}
                                placeholder="Password"
                              />
                            </td>
                          </tr>
                        </div>
                        <div className="signInError">
                          <p className="text-danger">{signInError}</p>
                        </div>
                      </form>
                      <button
                        className="btn btn-warning
            btn-rounded btn-block my-4 waves-effect z-depth-0 col-sm-4 col-12 m-5 "
                        disabled={!activateSubmit}
                        onClick={this.onSignin}
                      >
                        Sign in
                      </button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="content">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Successfully Signed in!</h1>
            <p class="lead">
              <a class="btn btn-warning btn-lg" href="#" role="button">
                <Link to="/">Load homepage</Link>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  onTextboxChangeUsername(event) {
    const valid = event.target.value.length >= 4; //length check
    this.setState({
      signInUsername: event.target.value,
      validUsername: valid,
      activateSubmit: this.state.signInPassword && valid,
    });
  }

  onTextboxChangePassword(event) {
    const valid = event.target.value.length >= 4; //length check
    this.setState({
      signInPassword: event.target.value,
      validPassword: valid,
      activateSubmit: this.state.signInUsername && valid,
    });
  }

  onSignin() {
    //post request sigin in

    axios
      .post("http://localhost:5000/police/signin", {
        username: this.state.signInUsername,
        password: this.state.signInPassword,
      })
      .then((res) => res.data)
      .then((json) => {
        if (json.success) {
          this.setState({
            signInError: json.message,
            token: json.token,
            adminRights: json.adminRights,
          });
          setInStorage("road_accident_prevention_system_webtoken", json.token);
          this.props.history.push("/");
        } else {
          this.setState({
            signInError: json.message,
          });
        }
      });
  }
}
