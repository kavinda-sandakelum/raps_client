import React, { Component } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUsers, faEdit, faBan, faTrashAlt, faSave, faSyncAlt  } from '@fortawesome/free-solid-svg-icons'
import { getLocalDate, getLocalTime, getSuburbName, getKmCat } from "../utils/displayformat";


const Accident = props => {
  if(props.accident.id === props.edit_id){
    //edit mode
      return(
      <tr className="table-secondary">
        <td>
        <input
              type="datetime-local"
              required
              className="form-control"
              value={props.edit_datetime}
              onChange={(e) => this.props.onChange("edit_datetime", e)}
            >
            </input>
        </td>
        <td>
        <input
              type="number"
              required
              className="form-control"
              value={props.edit_driverAge}
              onChange={(e) => this.props.onChange("edit_driverAge", e)}
              min='17'
              max='76'
            >
            </input>
        </td>
        <td>
                <button className="btn btn-sm btn-secondary" onClick={() => { props.discardEdit() }}>
                  <FontAwesomeIcon icon={faBan} />
                </button>&nbsp;
                <button className="btn btn-sm btn-success" onClick={() => {
                  props.updateAccident(
                    props.accident.id,
                    props.edit_name,
                    props.edit_adminRights
                  )}}>
                  <FontAwesomeIcon icon={faSave} />
                </button>

        </td>
        </tr>
    )
  }else{
  //normal mode
    return(
      <tr>
        <td>{getLocalDate(props.accident.datetime)}</td>
        <td>{getLocalTime(props.accident.datetime)}</td>
        <td>{props.accident.driverAge}</td>

        <td>{props.accident.driverGender?'Female':'Male'}</td>
        <td>{props.accident.weather?'Rain':'Clear'}</td>
        <td>{props.accident.roadSurface?'Wet':'Dry'}</td>

        <td>{props.accident.vehicleType==0?'Car':props.accident.vehicleType==1?'HV':'DP'}</td>
        <td>{props.accident.vehicleYOM}</td>
        <td>{getLocalDate(props.accident.licenseIssueDate)}</td>

        <td>{props.accident.drivingSide?'Matara':'Colombo'}</td>

        <td>{props.accident.severity==0?'Property':props.accident.severity==1?'Injury':'Fatality'}</td>

        <td>{props.accident.reason==0?'AnimalCrossing':props.accident.reason==1?'VehicleIssue'
        :props.accident.reason==2?'Speed':props.accident.reason==3?'Tailgaiting':props.accident.reason==3?'Sleep':
        'Slipping'}</td>
        <td>{props.accident.kmPost}</td>

        <td>{getSuburbName(props.accident.suburb)}</td>
        <td>{props.accident.operatedSpeed}</td>
        <td>{props.accident.vehicle_condition?'Bad':'Good'}</td>
        <td>{props.accident.status==0?'Reported':props.accident.status==1?'Dispatched':'Handled'}</td>

        <td className="text-muted">{props.accident.day_cat==0?'Weekday':props.accident.day_cat==1?'Weekend':'PubHoliday'}</td>
        <td className="text-muted">{props.accident.hour_cat==0?'Free':props.accident.hour_cat==1?'Rush':'Normal'}</td>
        <td className="text-muted">{props.accident.month_cat?'Off-peak':'Peak'}</td>
        <td className="text-muted">{props.accident.vision==0?'Poor':props.accident.vision==1?'Glare':props.accident.vision==2?'Normal':'Blurred'}</td>
        <td className="text-muted">{props.accident.age_cat==0?'Young':props.accident.age_cat==1?'Mid':'Older'}</td>
        <td className="text-muted">{getKmCat(props.accident.km_cat)}</td>
        <td className="text-muted">{props.accident.drowsiness?'1':'0'}</td>
        <td className="text-muted">{props.accident.enough_gap?'1':'0'}</td>
        <td className="text-muted">{props.accident.animal_crossing_problem?'1':'0'}</td>


        <td>
          <button className="btn btn-sm btn-info" onClick={() => { props.editAccident(props.accident) }}>
              <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => { props.deleteAccident(props.accident.id) }}>
              <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    )}
}

export default class AccidentList extends Component {
  constructor(props) {
    super(props);

    this.deleteAccident = this.deleteAccident.bind(this)
    this.editAccident = this.editAccident.bind(this)
    this.updateAccident = this.updateAccident.bind(this)
    this.discardEdit = this.discardEdit.bind(this)

    this.refresh = this.refresh.bind(this)


        this.onChangeAccidentDate = this.onChangeAccidentDate.bind(this);
        this.onChangeAccidentTime = this.onChangeAccidentTime.bind(this);
        this.onChangeDriverAge = this.onChangeDriverAge.bind(this);
        this.onChangeDriverGender = this.onChangeDriverGender.bind(this);
        this.onChangeWeather = this.onChangeWeather.bind(this);
        this.onChangeRoadSurface = this.onChangeRoadSurface.bind(this);
        this.onChangeVehicleType = this.onChangeVehicleType.bind(this);
        this.onChangeVehicleYOM = this.onChangeVehicleYOM.bind(this);
        this.onChangeVehicleCondition = this.onChangeVehicleCondition.bind(this);
        this.onChangeLicenseIssueDate = this.onChangeLicenseIssueDate.bind(this);
        this.onChangeDrivingSide = this.onChangeDrivingSide.bind(this);
        this.onChangeSeverity = this.onChangeSeverity.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onChangeKmPost = this.onChangeKmPost.bind(this);
        this.onChangeSuburb = this.onChangeSuburb.bind(this);
        this.onChangeOperatedSpeed = this.onChangeOperatedSpeed.bind(this);

    this.state = {accidentlist: [], loading: true};
  }


  async componentDidMount() {
     await this.getList();
  }

  getList = async () => {
    let res = await axios.get("http://localhost:5000/accident/list");
    this.setState({ accidentlist: res.data.data, updateFlag: false })
    console.log("state_set:")
    console.log(res.data.data)
  };

  async componentDidUpdate(){
    if(this.state.updateFlag===true){
      await this.getList();
    }
    console.log(this.state);
  }



  async deleteAccident(id) {
    await axios.delete('http://localhost:5000/accident/delete/', {data:{id:id,sessionToken:this.props.token}})
      .then(response => {
        console.log(response.data)
      });

    this.setState({
       updateFlag: true
    })
    this.refresh();
  }

  async updateAccident(
            id,
            accidentDate,
            accidentTime,
            driverAge,
            driverGender,
            weather,
            roadSurface,
            vehicleType,
            vehicleYOM,
            licenseIssueDate,
            drivingSide,
            severity,
            reason,
            kmPost,
            suburb,
            operatedSpeed,
            vehicle_condition,
            status,
            sessionToken
  ) {
    const datetime = new Date(accidentDate.toString().replace(/(\d\d:\d\d:\d\d)/,accidentTime))
    await axios.post('http://localhost:5000/accident/update/', {
                    id: id,
                    datetime: datetime,
                    driverAge: driverAge,
                    driverGender: driverGender,
                    weather: weather,
                    roadSurface: roadSurface,
                    vehicleType: vehicleType,
                    vehicleYOM: vehicleYOM,
                    licenseIssueDate: licenseIssueDate,
                    drivingSide: drivingSide,
                    severity: severity,
                    reason: reason,
                    kmPost: kmPost,
                    suburb: suburb,
                    status: status,
                    operatedSpeed: operatedSpeed,
                    vehicle_condition: vehicle_condition,
                    sessionToken:this.props.token
    })
      .then(response => {
        console.log(response.data)
      });
    this.setState({
       updateFlag: true,
       edit_id:null,
       edit_accidentDate: null,
       edit_accidentTime: null,
       edit_driverAge: null,
       edit_driverGender: null,
       edit_weather: null,
       edit_roadSurface: null,
       edit_vehicleType: null,
       edit_vehicleYOM: null,
       edit_licenseIssueDate: null,
       edit_drivingSide: null,
       edit_severity: null,
       edit_reason: null,
       edit_kmPost: null,
       edit_suburb: null,
       edit_status: null,
       edit_operatedSpeed: null,
       edit_vehicle_condition: null
    })
    this.refresh();
  }

  editAccident(accident) {
    this.setState({
       updateFlag: true,
       edit_id:accident.id,
       edit_accidentDate: accident.datetime,
       edit_accidentTime:getLocalTime(accident.datetime),
       edit_driverAge: accident.driverAge,
       edit_driverGender: accident.driverGender,
       edit_weather: accident.weather,
       edit_roadSurface: accident.roadSurface,
       edit_vehicleType: accident.vehicleType,
       edit_vehicleYOM: accident.vehicleYOM,
       edit_licenseIssueDate: accident.licenseIssueDate,
       edit_drivingSide: accident.drivingSide,
       edit_severity: accident.severity,
       edit_reason: accident.reason,
       edit_kmPost: accident.kmPost,
       edit_suburb: accident.suburb,
       edit_status: accident.status,
       edit_operatedSpeed: accident.operatedSpeed,
       edit_vehicle_condition: accident.vehicle_condition
    })
    console.log("edited state:")
    console.log(this.state)
  }

  discardEdit() {
    this.setState({
      edit_id:null,
      edit_accidentDate: null,
      edit_accidentTime: null,
      edit_driverAge: null,
      edit_driverGender: null,
      edit_weather: null,
      edit_roadSurface: null,
      edit_vehicleType: null,
      edit_vehicleYOM: null,
      edit_licenseIssueDate: null,
      edit_drivingSide: null,
      edit_severity: null,
      edit_reason: null,
      edit_kmPost: null,
      edit_suburb: null,
      edit_status: null,
      edit_operatedSpeed: null,
      edit_vehicle_condition: null,
      updateFlag: true
    })
  }

  refresh() {
    this.setState({
       updateFlag: true
    })
  }

  onChangeAccidentDate(date) {
      this.setState({
        edit_accidentDate: date
      })
    }

    onChangeAccidentTime(e) {
      this.setState({
        edit_accidentTime: e.target.value
      })
    }

    onChangeLicenseIssueDate(date) {
        this.setState({
          edit_licenseIssueDate: date
        })
      }


  onChangeAccidentTime(e) {
    this.setState({
      edit_accidentTime: e.target.value
    })
  }

  onChangeDriverAge(e) {
    this.setState({
      edit_driverAge: e.target.value
    })
  }
  onChangeDriverGender(e) {
    this.setState({
      edit_driverGender: (e.target.value==="male"?false:true)
    })
  }

  onChangeWeather(e) {
    this.setState({
      edit_eather: (e.target.value==="clear"?false:true)
    })
  }

  onChangeRoadSurface(e) {
    this.setState({
      edit_roadSurface: (e.target.value==="dry"?false:true)
    })
  }

  onChangeVehicleCondition(e) {
    this.setState({
      edit_vehicle_condition: (e.target.value==="good"?false:true)
    })
  }

  onChangeVehicleType(e) {
    this.setState({
      edit_vehicleType: parseInt(e.target.value)
    })
  }
  onChangeVehicleYOM(e) {
    this.setState({
      edit_vehicleYOM: e.target.value
    })
  }


  onChangeDrivingSide(e) {
    this.setState({
      edit_drivingSide: (e.target.value==="colombo"?false:true)
    })
  }
  onChangeSeverity(e) {
    this.setState({
      edit_severity: parseInt(e.target.value)
    })
  }
  onChangeReason(e) {
    this.setState({
      edit_reason: parseInt(e.target.value)
    })
  }
  onChangeKmPost(e) {
    this.setState({
      edit_kmPost: e.target.value
    })
  }
  onChangeSuburb(e) {
    this.setState({
      edit_suburb: parseInt(e.target.value)
    })
    switch(parseInt(e.target.value)){
      case 0:
      this.setState({edit_kmPost:0})
      break;
      case 1:
      this.setState({edit_kmPost:5.9})
      break;
      case 2:
      this.setState({edit_kmPost:13.7})
      break;
      case 3:
      this.setState({edit_kmPost:34.8})
      break;
      case 4:
      this.setState({edit_kmPost:46})
      break;
      case 5:
      this.setState({edit_kmPost:67.6})
      break;
      case 6:
      this.setState({edit_kmPost:79.8})
      break;
      case 7:
      this.setState({edit_kmPost:95.3})
      break;
      case 8:
      this.setState({edit_kmPost:108})
      break;
      case 9:
      this.setState({edit_kmPost:116.5})
      break;
      case 10:
      this.setState({edit_kmPost:127})
      break;
      default:
      break;
    }
  }
  onChangeOperatedSpeed(e) {
    this.setState({
      edit_operatedSpeed: e.target.value,
      res:''
    })
  }



  accidentList() {
    return this.state.accidentlist.map(currentaccident => {
      return <Accident
       accident={currentaccident}
       deleteAccident={this.deleteAccident}
       editAccident={this.editAccident}
       updateAccident={this.updateAccident}
       discardEdit={this.discardEdit}


        onChangeAccidentDate=   {this.onChangeAccidentDate}
        onChangeAccidentTime =  {this.onChangeAccidentTime}
        onChangeDriverAge =  {this.onChangeDriverAge}
        onChangeDriverGender=   {this.onChangeDriverGender}
        onChangeWeather=   {this.onChangeWeather}
        onChangeRoadSurface=   {this.onChangeRoadSurface}
        onChangeVehicleType=   {this.onChangeVehicleType}
        onChangeVehicleYOM=   {this.onChangeVehicleYOM}
        onChangeVehicleCondition=   {this.onChangeVehicleCondition}
        onChangeLicenseIssueDate=   {this.onChangeLicenseIssueDate}
        onChangeDrivingSide=   {this.onChangeDrivingSide}
        onChangeSeverity=   {this.onChangeSeverity}
        onChangeReason=   {this.onChangeReason}
        onChangeKmPost=   {this.onChangeKmPost}
        onChangeSuburb=   {this.onChangeSuburb}
        onChangeOperatedSpeed=   {this.onChangeOperatedSpeed}



       key={currentaccident.id}
       edit_id= {this.state.edit_id}
       edit_accidentDate= {this.state.edit_accidentDate}
       edit_accidentTime= {this.state.edit_accidentTime}
       edit_driverAge= {this.state.edit_driverAge}
       edit_driverGender= {this.state.edit_driverGender}
       edit_weather= {this.state.edit_weather}
       edit_roadSurface= {this.state.edit_roadSurface}
       edit_vehicleType= {this.state.edit_vehicleType}
       edit_vehicleYOM= {this.state.edit_vehicleYOM}
       edit_licenseIssueDate= {this.state.edit_licenseIssueDate}
       edit_drivingSide= {this.state.edit_drivingSide}
       edit_severity= {this.state.edit_severity}
       edit_reason= {this.state.edit_reason}
       edit_kmPost= {this.state.edit_kmPost}
       edit_suburb= {this.state.edit_suburb}
       edit_status= {this.state.edit_status}
       edit_operatedSpeed= {this.state.edit_operatedSpeed}
       edit_vehicle_condition= {this.state.edit_vehicle_condition}
       />;
    })
  }

  render() {
    return (
      <div>
        <h3> <FontAwesomeIcon icon={faUsers}/> Accident List&nbsp;
          <button className="btn btn-sm btn-light" onClick={() => {this.refresh() }}><FontAwesomeIcon icon={faSyncAlt}/></button>
        </h3>
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th>Accident Date</th>
              <th>Accident Time</th>
              <th>Driver Age</th>
              <th>Gender</th>
              <th>Weather</th>
              <th>RoadSurface</th>
              <th>Vehicle Type</th>
              <th>Vehicle YOM</th>
              <th>License Issue</th>
              <th>DrivingSide</th>
              <th>Severity</th>
              <th>Reason</th>
              <th>KMPost</th>
              <th>Suburb</th>
              <th>Op.Speed</th>
              <th>Veh.Condition</th>
              <th>Status</th>
              <th>Day_cat</th>
              <th>Hour_cat</th>
              <th>Month_cat</th>
              <th>Vision</th>
              <th>Age_cat</th>
              <th>KM_cat</th>
              <th>Drowsiness</th>
              <th>Enough_gap</th>
              <th>Animal_crossing</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.accidentList() }
          </tbody>
        </table>
      </div>
    )
  }
}
