import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class AccidentSubmission extends Component {
  constructor(props) {
    super(props);


    this.onChangeAccidentDate = this.onChangeAccidentDate.bind(this);
    this.onChangeAccidentTime = this.onChangeAccidentTime.bind(this);

    this.onChangeDriverAge = this.onChangeDriverAge.bind(this);
    this.onChangeDriverGender = this.onChangeDriverGender.bind(this);

    this.onChangeWeather = this.onChangeWeather.bind(this);
    this.onChangeVehicleType = this.onChangeVehicleType.bind(this);
    this.onChangeVehicleYOM = this.onChangeVehicleYOM.bind(this);


    this.onChangeLicenseIssueDate = this.onChangeLicenseIssueDate.bind(this);

    this.onChangeDrivingSide = this.onChangeDrivingSide.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);

    this.onChangeKmPost = this.onChangeKmPost.bind(this);
    this.onChangeSuburb = this.onChangeSuburb.bind(this);
    this.onChangeOperatedSpeed = this.onChangeOperatedSpeed.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    const d= new Date();

    this.state = {
      accidentDate:d,
      accidentTime:d.toString().match(/(\d\d:\d\d)/)[0],
      driverAge: 0,
      driverGender: 'male',
      weather: 'clear',
      vehicleType: 'car',
      vehicleYOM: d.getFullYear(),
      licenseIssueDate:d,
      drivingSide: 'colombo',
      severity: 'propertydamage',
      reason: 'speed',
      kmPost: 0,
      suburb: '',
      operatedSpeed: 0,

      token:this.props.token,
      res:''
    }
  }


  onChangeAccidentDate(date) {
      this.setState({
        accidentDate: date
      })
    }

    onChangeLicenseIssueDate(date) {
        this.setState({
          licenseIssueDate: date
        })
      }


  onChangeAccidentTime(e) {
    this.setState({
      accidentTime: e.target.value,
      res:''
    })
  }

  onChangeDriverAge(e) {
    this.setState({
      driverAge: e.target.value,
      res:''
    })
  }
  onChangeDriverGender(e) {
    this.setState({
      driverGender: e.target.value,
      res:''
    })
  }

  onChangeWeather(e) {
    this.setState({
      weather: e.target.value,
      res:''
    })
  }

  onChangeVehicleType(e) {
    this.setState({
      vehicleType: e.target.value,
      res:''
    })
  }
  onChangeVehicleYOM(e) {
    this.setState({
      vehicleYOM: e.target.value,
      res:''
    })
  }


  onChangeDrivingSide(e) {
    this.setState({
      drivingSide: e.target.value,
      res:''
    })
  }
  onChangeSeverity(e) {
    this.setState({
      severity: e.target.value,
      res:''
    })
  }
  onChangeReason(e) {
    this.setState({
      reason: e.target.value,
      res:''
    })
  }
  onChangeKmPost(e) {
    this.setState({
      kmPost: e.target.value,
      res:''
    })
  }
  onChangeSuburb(e) {
    this.setState({
      suburb: e.target.value,
      res:''
    })
    switch(e.target.value){
      case 'kottawa':
      this.setState({kmPost:0})
      break;
      case 'kahathuduwa':
      this.setState({kmPost:5.9})
      break;
      case 'gelanigama':
      this.setState({kmPost:13.7})
      break;
      case 'dodangoda':
      this.setState({kmPost:34.8})
      break;
      case 'welipanna':
      this.setState({kmPost:46})
      break;
      case 'kurundugahahetekma':
      this.setState({kmPost:67.6})
      break;
      case 'baddegama':
      this.setState({kmPost:79.8})
      break;
      case 'pinnaduwa':
      this.setState({kmPost:95.3})
      break;
      case 'imaduwa':
      this.setState({kmPost:108})
      break;
      case 'kokmaduwa':
      this.setState({kmPost:116.5})
      break;
      case 'godagama':
      this.setState({kmPost:127})
      break;
    }
  }
  onChangeOperatedSpeed(e) {
    this.setState({
      operatedSpeed: e.target.value,
      res:''
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const datetime = new Date(this.state.accidentDate.toString().replace(/(\d\d:\d\d:\d\d)/,this.state.accidentTime))

    const accident = {
      datetime:datetime,
      driverAge: this.state.driverAge,
      driverGender: this.state.driverGender,
      weather: this.state.weather,
      vehicleType: this.state.vehicleType,
      vehicleYOM: this.state.vehicleYOM,
      licenseIssueDate: this.state.licenseIssueDate,
      drivingSide: this.state.drivingSide,
      severity: this.state.severity,
      reason: this.state.reason,
      kmPost: this.state.kmPost,
      suburb: this.state.suburb,
      operatedSpeed: this.state.operatedSpeed,
      sessionToken: this.state.token
    }

    console.log(accident);

    const d= new Date();

    axios.post('http://localhost:5000/accident/submit', accident)
      .then(res=>{
        document.getElementById('accident-report-from').reset();
        this.setState({
          res: res.data.message,
          accidentDate:d,
          accidentTime:d.toString().match(/(\d\d:\d\d)/)[0],
          driverAge: 0,
          driverGender: 'male',
          weather: 'clear',
          vehicleType: 'car',
          vehicleYOM: d.getFullYear(),
          licenseIssueDay: d.getDay(),
          licenseIssueMonth: d.getMonth(),
          licenseIssueYear: d.getYear(),
          licenseIssueDate: d,
          drivingSide: 'colombo',
          severity: 'propertydamage',
          reason:'speed',
          kmPost: 0,
          suburb: '',
          operatedSpeed: 0
        })
      })

  }


  render() {
      return (
      <div className="acc">


      <form id="accident-report-from" onSubmit={this.onSubmit} >
        <div className="header"><h3>Accident Report </h3></div>
          <br/>
        <div>

        <div className="form-group row">
          <div className="col-sm-3">
            <label>Accident Date: </label>
          </div>
         <div className="col-sm-3">
            <div>
              <DatePicker className="form-control"
              selected={this.state.accidentDate}
              onChange={this.onChangeAccidentDate}
              />
            </div>
          </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-3"><label>Accident Time: </label>
            </div>
            <div className="col-sm-3">
              <input  type="time"
              className="form-control"
              value={this.state.accidentTime}
              onChange={this.onChangeAccidentTime}
              />
            </div>
          </div>
          <div className="form-group row">
         <div className="col-sm-3"><label>Driver Age </label></div>
          <div className="col-sm-3"><input  type="number"
              className="form-control"
              value={this.state.driverAge}
              onChange={this.onChangeDriverAge}
              min='0'
              max='99'
              /></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Driver Gender </label></div>
          <div className="col-sm-3">
              <select className="form-control" onChange={this.onChangeDriverGender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
              </select>
              </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Weather </label></div>
          <div className="col-sm-3">
              <select className="form-control" onChange={this.onChangeWeather}>
                  <option value="clear">Clear</option>
                  <option value="rainy">Rainy</option>
              </select>
              </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Vehicle Type </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeVehicleType}>
              <option value="car">Car</option>
              <option value="dualPurpose">Dual Purpose</option>
              <option value="hv">HV</option>
              </select>
          </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Vehicle manufacture year </label></div>
          <div className="col-sm-3"><input  type="number"
              className="form-control"
              value={this.state.vehicleYOM}
              onChange={this.onChangeVehicleYOM}
              /></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>License Issue Date </label></div>
          <div className="col-sm-3"><DatePicker
                  className="form-control"
                  selected={this.state.licenseIssueDate}
                  onChange={this.onChangeLicenseIssueDate}
          /></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Driving Side </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeDrivingSide}>
              <option value="colombo">Colombo to Matara</option>
              <option value="matara">Matara to Colombo</option>
              </select>
          </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Severity </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeSeverity}>
              <option value="propertydamage">Property Damage</option>
              <option value="injury">Injury</option>
              <option value="fatal">Fatal</option>
              </select></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Reason </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeReason}>
              <option value="speed">Speeding</option>
              <option value="sleep">Sleep</option>
              <option value="slipping">Slipping</option>
              <option value="vehicleIssue">Vehicle issue</option>
              <option value="tyreBlast">Tyre blast</option>
              <option value="tyrePatch">Tyre patch</option>
              <option value="animal">Animal Crossing</option>
              <option value="other">Other</option>
              </select></div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Suburb </label></div>
          <div className="col-sm-3">
          <select className="form-control" onChange={this.onChangeSuburb}>
              <option value="kottawa">Kottawa</option>
              <option value="kahathuduwa">Kahathuduwa</option>
              <option value="gelanigama">Gelanigama</option>
              <option value="dodangoda">Dodangoda</option>
              <option value="welipanna">Welipanna</option>
              <option value="kurundugahahetekma">Kurundugahahetekma</option>
              <option value="baddegama">Baddegama</option>
              <option value="pinnaduwa">Pinnaduwa</option>
              <option value="imaduwa">Imaduwa</option>
              <option value="kokmaduwa">Kokmaduwa</option>
              <option value="godagama">Godagama</option>
              </select></div>
          </div>

          <div className="form-group row">
          <div className="col-sm-3"><label>KM Post </label></div>
          <div className="col-sm-3"><input  type="number" step='0.1'
              className="form-control"
              value={this.state.kmPost}
              onChange={this.onChangeKmPost}
              min='0'
              max='127'
              /></div>
          </div>

          <div className="form-group row">
          <div className="col-sm-3"><label>Operated Speed (km/h) </label></div>
          <div className="col-sm-3"><input  type="number"
              className="form-control"
              value={this.state.operatedSpeed}
              onChange={this.onChangeOperatedSpeed}
              min='0'
              /></div>
          </div>



          <div className="form">
            <br/>
          <input type="submit" value="Submit Report" onSubmit={this.onSubmit} className="btn btn-primary" /> {this.state.res}
          <div>

          </div>

        </div>

      </div>


      </form>


      </div>
      )
  }

}
