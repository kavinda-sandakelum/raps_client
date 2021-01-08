import React, { Component } from "react";
import axios from "axios";

export default class AddPolice extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAdminRights = this.onChangeAdminRights.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      name: "",
      password: "",
      adminRights: false,
      token: this.props.token,
      res: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      res: "",
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
      res: "",
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      res: "",
    });
  }

  onChangeAdminRights(e) {
    this.setState({
      adminRights: e.target.checked,
      res: "",
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const police = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      adminRights: this.state.adminRights,
      sessionToken: this.state.token,
    };

    console.log(police);

    axios.post("http://localhost:5000/police/signup", police).then((res) => {
      this.setState({
        res: res.data.message,
        username: "",
        name: "",
        password: "",
        adminRights: false,
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group col-sm-3">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              minlength="4"
            />
          </div>
          <div className="form-group col-sm-3">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group col-sm-3">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              minlength="4"
            />
          </div>
          <div className="form-check col-sm-3">
            <input
              type="checkbox"
              className="form-check-input"
              value={this.state.adminRights}
              onChange={this.onChangeAdminRights}
            />
            <label>Admin Rights </label>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
        <div>{this.state.res}</div>
      </div>
    );
  }
}
