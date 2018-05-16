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
      date: this.props.date,
    };
  };

  handleChange(date) {
    this.setState({
      date: date
    });
    this.props.updateDate(date);
  }

  render() {
    return (
      <DatePicker ref="date" className="Date" selected={this.state.date} onChange={this.handleChange}/>
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
      numPassengers: this.props.numPassengers,
    };
  }

  lessPass = () => {
    var prevNumPassengers = this.state.numPassengers;
    if(prevNumPassengers > 1){
      this.setState({
        numPassengers: prevNumPassengers - 1,
      });
    }
  };

  morePass = () => {
    var prevNumPassengers = this.state.numPassengers;
    if(prevNumPassengers >= 1){
      this.setState({
        numPassengers: prevNumPassengers + 1,
      });
    }
  };

  render() {
    return (
      <div className="Head">
        <div className="TripInfo">
          <Date date={this.props.date} updateDate={(date) => this.props.updateDate(date)}/>
          <Origin stations={this.props.stations}/>
          <Destination stations={this.props.stations}/>
          <LessPass numPassengers={this.state.numPassengers} lessPass={this.lessPass}/>
          <NumPassengers numPassengers={this.state.numPassengers}/>
          <MorePass numPassengers={this.state.numPassengers} morePass={this.morePass}/>
        </div>
        <div>
          <button className="submit" onClick={() => this.props.showResults(this.state.numPassengers)}>Check Availability</button>
        </div>
      </div>
    );
  }
}

class Modal extends React.Component {
  render() {
    if (this.props.isOpen === false)
      return null

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#33A7B7',
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    return (
      <div>
        <div style={modalStyle}>{this.props.children}</div>
        <div style={backdropStyle} onClick={e => this.close(e)}/>
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      date: this.props.date,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.state.date, nextProps.date);
    this.setState({
      date: nextProps.date,
    });
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    if(!this.props.showResults){
      return null;
    }

    return (
      <div className="Body">
        <div className="Trips">
          <table className="Results">
            <tbody>
              <tr className="headRow">
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Available Seats</th>
                <th>Date</th>
              </tr>
              <tr className="row" onClick={this.openModal}>
                <td>{this.props.date.format('LT')}</td>
                <td>{this.props.date.format('LT')}</td>
                <td>{this.props.seatsFree}</td>
                <td>{this.props.date.format('L')}</td>
              </tr>
              <tr className="row" onClick={this.openModal}>
                <td>{this.props.date.format('LT')}</td>
                <td>{this.props.date.format('LT')}</td>
                <td>{this.props.seatsFree}</td>
                <td>{this.props.date.format('L')}</td>
              </tr>
              <tr className="row" onClick={this.openModal}>
                <td>{this.props.date.format('LT')}</td>
                <td>{this.props.date.format('LT')}</td>
                <td>{this.props.seatsFree}</td>
                <td>{this.props.date.format('L')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Modal className="Modal" isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            Insert Trip Specs Components Here
        </Modal>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      stations: [],
      numPassengers: 1,
      showResults: false,
      seatsFree: "# seats free"
    };
  };

  showResults = (numPassengers) => {
    if(numPassengers > 0){
      this.setState({
        showResults: true,
      });
    }else{
      alert("Increase passenger count!");
    }
  }

  updateDate = (date) => {
    this.setState({
      date: date,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={banner} className="Banner"/>
        </header>
        <TripInfo date={this.state.date} updateDate={(date) => this.updateDate(date)} stations={this.state.stations} numPassengers={this.state.numPassengers} showResults={(numPassengers) => this.showResults(numPassengers)}/>
        <Results showResults={this.state.showResults} seatsFree={this.state.seatsFree} date={this.state.date}/>
      </div>
    );
  }
}

export default App;
