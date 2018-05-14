import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import banner from './banner-rail.jpg';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

class Origin extends Component {
  createOptions = (option) => {
    return <option>{option}</option>;
  }

  render() {
    return (
      <div className="Origin">
        <input ref="origin" className="input_bar" placeholder="Origin" list="stations"/>
        <datalist id="stations">
          {this.props.stations.map(this.createOptions)}
        </datalist>
      </div>
    );
  }
}

class Destination extends Component {
  createOptions = (option) => {
    return <option>{option}</option>;
  }

  render() {
    return (
      <div className="Destination">
        <input ref="destination" className="input_bar" placeholder="Destination" list="stations"/>
        <datalist id="stations">
          {this.props.stations.map(this.createOptions)}
        </datalist>
      </div>
    );
  }
}

class NumPassengers extends Component {
  createOptions = (option) => {
    return <option>{option}</option>;
  }

  render() {
    return (
      <div className="NumPassengers">
        <input ref="passengers" className="input_bar" placeholder="# of Passengers" list="passengers"/>
        <datalist id="passengers">
          {this.props.passengers.map(this.createOptions)}
        </datalist>
      </div>
    );
  }
}

class Date extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      startDate: moment(),
    };
  };

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <DatePicker className="Date" selected={this.state.startDate} onChange={this.handleChange}/>
    );
  }
}

class TripInfo extends Component {
  render() {
    return (
      <div className="TripInfo">
        <div className="Stations">
          <Origin stations={this.props.stations}/>
          <Destination stations={this.props.stations}/>
        </div>
        <div className="PassengerType">
          <NumPassengers passengers={[1,2,3,4,5,6,7,8]}/>
          <Date/>
        </div>
        <div>
          <input className="submit" type="submit"/>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
    };
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={banner} className="Banner"/>
        </header>
        <TripInfo startDate={this.state.startDate} stations={this.state.stations}/>
      </div>
    );
  }
}

export default App;
