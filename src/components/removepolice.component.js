import React, { Component } from 'react';
import axios from 'axios';

const Police = props => (
  <tr>
    <td>{props.police.username}</td>
    <td>{props.police.adminRights?'Admin':'User'}</td>
    <td>
      <a href="#" onClick={() => { props.deletePolice(props.police.username) }}>remove</a>
    </td>
  </tr>
)

export default class PoliceList extends Component {
  constructor(props) {
    super(props);

    this.deletePolice = this.deletePolice.bind(this)

    this.state = {policelist: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/police/list')
      .then(response => {
        this.setState({ policelist: response.data.data })
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePolice(username) {
    axios.delete('http://localhost:5000/police/delete/', {data:{username:username,sessionToken:this.props.token}})
      .then(response => {
        console.log("username:",username)
        console.log(response.data)
      });

    this.setState({
      policelist: this.state.policelist.filter(el => el.username !== username)
    })
  }

  policeList() {
    return this.state.policelist.map(currentpolice => {
      return <Police police={currentpolice} deletePolice={this.deletePolice} key={currentpolice.username}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Police List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Admin Rights</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            { this.policeList() }
          </tbody>
        </table>
      </div>
    )
  }
}
