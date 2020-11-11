import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { getFromStorage , setInStorage } from '../utils/storage';


export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
    this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
    this.onSignin = this.onSignin.bind(this);

    this.state = {
      isLoading: true,
      token: '',
      signInError:'',
      signInUsername:'',
      signInPassword:'',
      validUsername:false,
      validPassword:false,
      activateSubmit:false

    };
  }

  componentDidMount() {
    const token = getFromStorage('road_accident_prevention_system_webtoken');

    if(token){
      //verify token
      try{
        axios.get('http://localhost:5000/police/verifysession?token='+token)
        .then(res=>res.data)
        .then(json=>{
          if(json.success){
            this.setState({
              token:token,
              isLoading:false
            })
          }else{
            this.setState({
              isLoading:false
            })
          }
        })
      }catch(err){
        console.log(err);
        this.setState({isLoading:false})
      }
    }else{
      this.setState({isLoading:false})
    }

}





  render() {

    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInPassword,
      activateSubmit
    }  = this.state;


    if(isLoading){
      return(
        <div>
          Loading...
        </div>
      )
    }

    if(!token){
      return (
        <div className="content">
        <h1>Road Accident Prevention System</h1>
        <br/>
        <form>
        <div className="form-group">
        <label>Username </label><br/>
        <input type="text" value={signInUsername} onChange={this.onTextboxChangeUsername}></input>
        </div>
        <div className="form-group">
        <label>Password </label><br/>
        <input type="password" value={signInPassword} onChange={this.onTextboxChangePassword}></input>
        </div>
        <div className="signInError">
          <p>{signInError}</p>
        </div>
        </form>
        <button className="btn btn-primary" disabled={!activateSubmit} onClick={this.onSignin}>Sign in</button>


        </div>


      )
    }

    return (
      <div className="content">
        Successfully Signed in!<br/>
        <Link to="/">Load homepage</Link>
      </div>
    )
  }


  onTextboxChangeUsername(event){
    const valid = event.target.value.length>=4 //length check
    this.setState({
      signInUsername : event.target.value,
      validUsername: valid,
      activateSubmit: this.state.signInPassword && valid
    })

  }

  onTextboxChangePassword(event){
    const valid = event.target.value.length>=4 //length check
    this.setState({
      signInPassword : event.target.value,
      validPassword: valid,
      activateSubmit: this.state.signInUsername && valid
    })
  }

  onSignin(){
    //post request sigin in
    axios.post('http://localhost:5000/police/signin',{
      username:this.state.signInUsername,
      password:this.state.signInPassword
      }
    )
    .then(res=>res.data)
    .then(json=>{
      if(json.success){
        this.setState({
          signInError: json.message,
          token:json.token,
          adminRights:json.adminRights
        })
        setInStorage('road_accident_prevention_system_webtoken',json.token);
      }else{
        this.setState({
          signInError: json.message,
        })
      }
    })
  }
}
