import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from './navbar.component'
import Content from './content.component'

import { getFromStorage } from '../utils/storage'; //implement log out

export default class Home extends Component {
    constructor() {
        super()
        this.handleNavigation=this.handleNavigation.bind(this)
        this.state = {
            signedin:false,
            loading: false,
            data: {},
            token:0,
            nav:'accidentsubmission'
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        const token = getFromStorage('road_accident_prevention_system_webtoken');
        console.log("token:"+token);
        axios.get("http://localhost:5000/police/verifysession/",{params:{token:token}})
            .then(response => response.data)
            .then(data => {
                console.log(data);
                this.setState({
                    signedin:true,
                    loading: false,
                    data: data,
                    token:token
                })
            })
    }

    handleNavigation(str){
      this.setState({nav:str})
    }

    render() {
        if(this.state.loading){
          return(
            <div>
              loading...
            </div>)
        }else{
          //not logged in
          if(!this.state.data.username){
            return(
              <div className="content">
              <h1>Road Accident Prediction System</h1>
              Sign in to continue<br/>
              <Link to="/signin">Sign in</Link>
              </div>
            )
          }else{
          return (
              <div>
              <Navbar
                adminRights={this.state.data.adminRights}
                token={this.state.token}
                navState={this.state.nav}
                handleNavigation={this.handleNavigation}
              />
              <div className="content">
                  <Content nav={this.state.nav} token={this.state.token}/>
              </div>
              </div>
          )
        }
        }


    }
}
