import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import banner from './banner-rail.jpg';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

class Origin extends Component {
  createOptions = (option) => {
    return <option key={option}>{option}</option>;
  }

  render() {
    return (
      <div className="Origin">
        <select ref="origin" className="input_bar">
          <option>-- Origin Station --</option>
          {this.props.stations.map(this.createOptions)}
        </select>
      </div>
    );
  }
}

class Destination extends Component {
  createOptions = (option) => {
    return <option key={option}>{option}</option>;
  }

  render() {
    return (
      <div className="Destination">
        <select ref="destination" className="input_bar">
          <option>-- Destination Station --</option>
          {this.props.stations.map(this.createOptions)}
        </select>
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
    this.props.morePass();
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
          {/*<LessPass numPassengers={this.state.numPassengers} lessPass={this.lessPass}/>
          <NumPassengers numPassengers={this.state.numPassengers}/>
          <MorePass numPassengers={this.state.numPassengers} morePass={this.morePass}/>*/}
        </div>
        <div>
          <button className="submit" onClick={() => this.props.updateShowResults(this.state.numPassengers)}>Check Availability</button>
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
      background: '#B8DEEA',
      border: 'solid',
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
        <div style={modalStyle}>
	        <button className="x" onClick={e => this.close(e)}>
	            X
	        </button>
	        {this.props.children}
        </div>
        <div style={backdropStyle} /*onClick={e => this.close(e)}*//>
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    this.props.updateNumPassengers(0,0,0);
    if(this.props.confirmPassCount){
    	this.props.updateConfirmPassCount();
    }

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}

class NumAdults extends Component {
  render() {
    return (
      <div className="NumAdults">
        <input className="pass_input" value={this.props.numAdults} type="input_bar"/>
      </div>
    );
  }
}

class NumSeniors extends Component {
  render() {
    return (
      <div className="NumSeniors">
        <input className="pass_input" value={this.props.numSeniors} type="input_bar"/>
      </div>
    );
  }
}

class NumChildren extends Component {
  render() {
    return (
      <div className="NumChildren">
        <input className="pass_input" value={this.props.numChildren} type="input_bar"/>
      </div>
    );
  }
}

class ReservationSpecs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: this.props.confirmPassCount,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			display: nextProps.confirmPassCount,
		});
	}

  lessAdults = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var currAdultsCount = prevAdultsCount-1;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    if(currAdultsCount <= 0 && prevSeniorsCount <= 0 && prevChildrenCount > 0){
      alert("There must be at least 1 adult or 1 senior to book a child's ticket.");
      return;
    }
    if(prevAdultsCount > 0){
      this.props.updateNumPassengers(currAdultsCount,prevSeniorsCount,prevChildrenCount);
    }
  };

  moreAdults = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var currAdultsCount = prevAdultsCount+1;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    if(prevAdultsCount + prevSeniorsCount + prevChildrenCount < 8){
      this.props.updateNumPassengers(currAdultsCount,prevSeniorsCount,prevChildrenCount);
    }else{
      alert("For parties of 9 or more, email for booking.");
    }
  };

  lessSeniors = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var currSeniorsCount = prevSeniorsCount-1;
    var prevChildrenCount = this.props.numPassengers.children;
    if(currSeniorsCount <= 0 && prevAdultsCount <= 0 && prevChildrenCount > 0){
      alert("There must be at least 1 adult or 1 senior to book a child's ticket.");
      return;
    }
    if(prevSeniorsCount > 0){
      this.props.updateNumPassengers(prevAdultsCount,currSeniorsCount,prevChildrenCount);
    }
  };

  moreSeniors = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var currSeniorsCount = prevSeniorsCount+1;
    var prevChildrenCount = this.props.numPassengers.children;
    if(prevAdultsCount + prevSeniorsCount + prevChildrenCount < 8){
      this.props.updateNumPassengers(prevAdultsCount,currSeniorsCount,prevChildrenCount);
    }else{
      alert("For parties of 9 or more, email for booking.");
    }
  };

  lessChildren = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    var currChildrenCount = prevChildrenCount-1;
    if(prevChildrenCount > 0){
      this.props.updateNumPassengers(prevAdultsCount,prevSeniorsCount,currChildrenCount);
    }
  };

  moreChildren = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    var currChildrenCount = prevChildrenCount+1;
    if(prevAdultsCount === 0 && prevSeniorsCount === 0){
      alert("There must be at least 1 adult or 1 senior to book a child's ticket.");
      return;
    }else if(prevAdultsCount + prevSeniorsCount + prevChildrenCount < 8){
      this.props.updateNumPassengers(prevAdultsCount,prevSeniorsCount,currChildrenCount);
    }else{
      alert("For parties of 9 or more, email for booking.");
    }
  };

  handleClick = () => {
    var adultsCount = this.props.numPassengers.adults;
    var seniorsCount = this.props.numPassengers.seniors;
    var childrenCount = this.props.numPassengers.children;
    var date = this.props.date;
    if(adultsCount + seniorsCount + childrenCount === 0){
      alert("Add at least 1 adult or 1 senior to itinerary.")
      return;
    }
    this.props.updateConfirmPassCount();
  }

  render() {
  	if(this.state.display){
  		return null;
  	}
    return (
      <div className="ReservationSpecs">
        <div className="PassengerCount">
          <div className="NumPassType">
            <LessPass lessPass={this.lessAdults}/>
              <NumAdults numAdults={this.props.numPassengers.adults}/>
            <MorePass morePass={this.moreAdults}/>
          </div>
          <div className="PassengerDescription">
            <div className="PassengerType">Adults</div>
            <div className="PassengerAge">13-64</div>
          </div>
          <div className="NumPassType">
            <LessPass lessPass={this.lessSeniors}/>
              <NumSeniors numSeniors={this.props.numPassengers.seniors}/>
            <MorePass morePass={this.moreSeniors}/>
          </div>
          <div className="PassengerDescription">
            <div className="PassengerType">Seniors</div>
            <div className="PassengerAge">65+</div>
          </div>
          <div className="NumPassType">
            <LessPass lessPass={this.lessChildren}/>
              <NumChildren numChildren={this.props.numPassengers.children}/>
            <MorePass morePass={this.moreChildren}/>
          </div>
          <div className="PassengerDescription">
            <div className="PassengerType">Children</div>
            <div className="PassengerAge">2-12</div>
          </div>
        </div>
        <div className="fareBook">
	        <text className="fare">{"Total: $" + 20}</text>
	        <button className="bookTrip" onClick={() => this.handleClick()}>Continue</button>
	    </div>
      </div>
    );
  }
}

class PassengerSpecs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: this.props.confirmPassCount,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			display: nextProps.confirmPassCount,
		});
	}

	handleClick = () => {
		var adultsCount = this.props.numPassengers.adults;
	    var seniorsCount = this.props.numPassengers.seniors;
	    var childrenCount = this.props.numPassengers.children;
	    var date = this.props.date;
	    fetch('reservations/', {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({
	        adultsCount: adultsCount,
	        seniorsCount: seniorsCount,
	        childrenCount: childrenCount,
	        date: date,
	      }),
	    });

		this.props.updateNumPassengers(0,0,0);
		this.props.updateConfirmPassCount();
		this.props.updateShowResults();
		this.props.onClose();
	}

	render() {
		if(!this.state.display){
			return null;
		}
		return (
			<form className="ReservationSpecs">
				<div>
					<input className="form_input" placeholder="First Name"/>
					<input className="form_input" placeholder="Last Name"/>
					<input className="form_input" placeholder="Email"/>
				</div>
				<button className="bookTrip" onClick={() => this.handleClick()}>Book Trip</button>
			</form>
		);
	}
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      date: this.props.date,
      confirmPassCount: false,
      display: this.props.showResults,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      date: nextProps.date,
      display: nextProps.showResults,
    });
  }

  componentdidMount() {
  	console.log(this.state);
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
  }

  updateConfirmPassCount = () => {
  	this.setState({
  		confirmPassCount: !this.state.confirmPassCount,
  	});
  };

  render() {
    if(!this.state.display){
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
                <td>3:45 PM</td>
                <td>4:45 PM</td>
                <td>7</td>
                <td>{this.props.date.format('L')}</td>
              </tr>
              <tr className="row" onClick={this.openModal}>
                <td>4:00 PM</td>
                <td>5:00 PM</td>
                <td>12</td>
                <td>{this.props.date.format('L')}</td>
              </tr>
              <tr className="row" onClick={this.openModal}>
                <td>5:15 PM</td>
                <td>6:15 PM</td>
                <td>3</td>
                <td>{this.props.date.format('L')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Modal className="Modal" isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} 
        		confirmPassCount={this.state.confirmPassCount} updateConfirmPassCount={() => this.updateConfirmPassCount()}
        		updateNumPassengers={(adults,seniors,children) => this.props.updateNumPassengers(adults,seniors,children)}>
            <ReservationSpecs confirmPassCount={this.state.confirmPassCount} updateConfirmPassCount={() => this.updateConfirmPassCount()} 
            					numPassengers={this.props.numPassengers} updateNumPassengers={(adults,seniors,children) => this.props.updateNumPassengers(adults,seniors,children)} 
            					date={this.props.date}/>
            <PassengerSpecs confirmPassCount={this.state.confirmPassCount} updateConfirmPassCount={() => this.updateConfirmPassCount()} numPassengers={this.props.numPassengers} 
            				updateNumPassengers={(adults,seniors,children) => this.props.updateNumPassengers(adults,seniors,children)} 
            				updateShowResults={() => this.props.updateShowResults()} onClose={() => this.closeModal()} date={this.props.date}/>
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
      //numPassengers: 1,
      numPassengers: {
        adults: 0,
        seniors: 0,
        children: 0,
      },
      showResults: false,
      seatsFree: "# seats free"
    };
  };

  componentWillMount() {
  	fetch('stations/').then(res => res.json()).then(stations => {
  		this.setState({
	  		stations: stations.map(s => s.station_name),
	  	});
  	});
  }

  updateShowResults = (numPassengers) => {
    this.setState({
      showResults: !this.state.showResults,
    });
    /*if(numPassengers > 0){
      this.setState({
        showResults: true,
      });
    }else{
      alert("Increase passenger count!");
    }*/
  };

  updateDate = (date) => {
    this.setState({
      date: date,
    });
  };

  updateNumPassengers = (newAdults,newSeniors,newChildren) => {
    this.setState({
      numPassengers: {
        adults: newAdults,
        seniors: newSeniors,
        children: newChildren,
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={banner}  alt="" className="Banner"/>
        </header>
        <TripInfo date={this.state.date} updateDate={(date) => this.updateDate(date)} stations={this.state.stations} numPassengers={this.state.numPassengers} 
        			updateShowResults={(numPassengers) => this.updateShowResults(numPassengers)}/>
        <Results showResults={this.state.showResults} updateShowResults={(numPassengers) => this.updateShowResults(numPassengers)} seatsFree={this.state.seatsFree} date={this.state.date} 
        numPassengers={this.state.numPassengers} updateNumPassengers={(adults,seniors,children) => this.updateNumPassengers(adults,seniors,children)}/>
      </div>
    );
  }
}

export default App;
