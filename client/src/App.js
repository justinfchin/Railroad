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
        <input ref="passengers" className="pass_input" value={this.props.numPassengers} /*placeholder="# of Passengers"*/ list="passengers"/>
        {/*<datalist id="passengers">
          {this.props.passengers.map(this.createOptions)}
        </datalist>*/}
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

class LessPass extends Component {
  handleClick = () => {
    this.props.lessPass();
  };

  render() {
    return (
      <div className="LessPass" onClick={this.handleClick}>-</div>
    );
  }
}

class MorePass extends Component {
  handleClick = () => {
    if(this.props.numPassengers < 8){
      this.props.morePass();
    }else{
      alert("Too many guests");
    }
  };

  render() {
    return (
      <div className="MorePass" onClick={this.handleClick}>+</div>
    );
  }
}

class TripInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPassengers: 0,
    };
  }

  lessPass = () => {
    var prevNumPassengers = this.state.numPassengers;
    if(prevNumPassengers > 0){
      this.setState({
        numPassengers: prevNumPassengers - 1,
      });
    }
  };

  morePass = () => {
    var prevNumPassengers = this.state.numPassengers;
    if(prevNumPassengers >= 0){
      this.setState({
        numPassengers: prevNumPassengers + 1,
      });
    }
  };

  render() {
    return (
      <div className="Head">
        <div className="TripInfo">
          <Date/>
          <Origin stations={this.props.stations}/>
          <Destination stations={this.props.stations}/>
          <LessPass numPassengers={this.state.numPassengers} lessPass={this.lessPass}/>
          <NumPassengers numPassengers={this.state.numPassengers}/>
          <MorePass numPassengers={this.state.numPassengers} morePass={this.morePass}/>
        </div>
        <div>
          <button className="submit">Submit</button>
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
