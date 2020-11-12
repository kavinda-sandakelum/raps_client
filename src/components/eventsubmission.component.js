import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EventSubmission extends Component {
  constructor(props) {
    super(props);


    this.onChangeEventDate = this.onChangeEventDate.bind(this);
    this.onChangeEventTime = this.onChangeEventTime.bind(this);
    this.onChangeType = this.onChangeType.bind(this);



    this.onChangeDrivingSide = this.onChangeDrivingSide.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);

    this.onChangeKmPost = this.onChangeKmPost.bind(this);
    this.onChangeSuburb = this.onChangeSuburb.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    const d= new Date();

    this.state = {
      eventDate:d,
      eventTime:d.toString().match(/(\d\d:\d\d)/)[0],
      type: 'fallen tree',
      drivingSide: 'colombo',
      severity: 'minor',
      kmPost: 0,
      suburb: 'kottawa',
      token:this.props.token,
      res:''
    }
  }


  onChangeEventDate(date) {
      this.setState({
        eventDate: date
      })
    }




  onChangeEventTime(e) {
    this.setState({
      eventTime: e.target.value,
      res:''
    })
  }


  onChangeType(e) {
    this.setState({
      type: e.target.value,
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


  onSubmit(e) {
    e.preventDefault();

    const datetime = new Date(this.state.eventDate.toString().replace(/(\d\d:\d\d:\d\d)/,this.state.eventTime))

    const event = {
      datetime:datetime,
      type: this.state.type,
      drivingSide: this.state.drivingSide,
      severity: this.state.severity,
      kmPost: this.state.kmPost,
      suburb: this.state.suburb,
      sessionToken: this.state.token,
    }

    console.log(event);

    const d= new Date();

    axios.post('http://localhost:5000/event/submit', event)
      .then(res=>{
        document.getElementById('event-report-from').reset();
        this.setState({
          res: res.data.message,
          eventDate:d,
          eventTime:d.toString().match(/(\d\d:\d\d)/)[0],
          type: 'fallen tree',
          drivingSide: 'colombo',
          severity: 'minor',
          kmPost: 0,
          suburb: 'kottawa'
        })
      })

  }


  render() {
      return (
      <div className="acc">


      <form id="event-report-from" onSubmit={this.onSubmit} >
        <div className="header"><h3>Event Report </h3></div>
          <br/>
        <div>

        <div className="form-group row">
          <div className="col-sm-3">
            <label>Event Date: </label>
          </div>
         <div className="col-sm-3">
            <div>
              <DatePicker className="form-control"
              selected={this.state.eventDate}
              onChange={this.onChangeEventDate}
              />
            </div>
          </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-3"><label>Event Time: </label>
            </div>
            <div className="col-sm-3">
              <input  type="time"
              className="form-control"
              value={this.state.eventTime}
              onChange={this.onChangeEventTime}
              />
            </div>
          </div>


          <div className="form-group row">
          <div className="col-sm-3"><label>Type </label></div>
          <div className="col-sm-3">
              <select className="form-control" onChange={this.onChangeType}>
                  <option value="fallen tree">Fallen Tree</option>
                  <option value="landslide">Landslide</option>
                  <option value="flooding">Flooding</option>
                  <option value="mist">Mist</option>
              </select>
              </div>
          </div>

          <div className="form-group row">
          <div className="col-sm-3"><label>Side </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeDrivingSide}>
              <option value="colombo">Colombo to Matara</option>
              <option value="matara">Matara to Colombo</option>
              </select>
          </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-3"><label>Severity </label></div>
          <div className="col-sm-3"><select className="form-control" onChange={this.onChangeSeverity}>
              <option value="minor">Minor</option>
              <option value="intermediate ">Intermediate</option>
              <option value="major">Major</option>
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
