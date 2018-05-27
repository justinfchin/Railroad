import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import banner from './banner-rail.jpg';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

class Origin extends Component {
  constructor(props) {
  	super(props);
  	this.handleChange = this.handleChange.bind(this);
  }

  createOptions = (option) => {
    return <option key={option}>{option}</option>;
  }

  handleChange() {
  	this.props.updateOrigin(this.refs.origin.value);
  }

  render() {
    return (
      <div className="Origin">
        <select ref="origin" className="input_bar" onChange={this.handleChange}>
          <option>-- Origin Station --</option>
          {this.props.stations.map(this.createOptions)}
        </select>
      </div>
    );
  }
}

class Destination extends Component {
  constructor(props) {
  	super(props);
  	this.handleChange = this.handleChange.bind(this);
  }

  createOptions = (option) => {
    return <option key={option}>{option}</option>;
  }

  handleChange() {
  	this.props.updateDestination(this.refs.destination.value);
  }

  render() {
    return (
      <div className="Destination">
        <select ref="destination" className="input_bar" onChange={this.handleChange}>
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
      <DatePicker ref="date" className="Date" selected={this.state.date}  
                  filterDate={(date) => {return moment().subtract(1, "days") < date && moment().add(365, "days") > date;}} 
                  onChange={this.handleChange}/>
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
      date: this.props.date,
      origin: "",
      destination: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({
  		date: nextProps.date,
  	});
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

  updateOrigin(origin) {
  	this.setState({
  		origin: origin,
  	});
    this.props.updateOrigin(origin);
  };

  updateDestination(destination) {
  	this.setState({
  		destination: destination,
  	});
    this.props.updateDestination(destination);
  };

  handleClick() {
  	if(this.state.origin !== this.state.destination){
	  	this.props.updateShowResults(true);
      this.props.updateTripsLoading(true);
      this.props.findAvailableTrips(this.state.date,this.state.origin,this.state.destination);
		}else{
			this.props.updateShowResults(true);
		}
  };

  handleChange() {
    if(this.state.origin !== this.state.destination){
      this.props.findAvailableTrips(this.state.date,this.state.origin,this.state.destination);
    }
  }

  render() {
    return (
      <div className="Head">
        <div className="TripInfo">
          <Date date={this.props.date} updateDate={(date) => this.props.updateDate(date)} onChange={this.handleChange}/>
          <Origin stations={this.props.stations} updateOrigin={(origin) => this.updateOrigin(origin)} onChange={this.handleChange}/>
          <Destination stations={this.props.stations} updateDestination={(destination) => this.updateDestination(destination)} onChange={this.handleChange}/>
          {/*<LessPass numPassengers={this.state.numPassengers} lessPass={this.lessPass}/>
          <NumPassengers numPassengers={this.state.numPassengers}/>
          <MorePass numPassengers={this.state.numPassengers} morePass={this.morePass}/>*/}
        </div>
        <div>
          <button className="submit" onClick={this.handleClick}>Check Availability</button>
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
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#B8DEEA',
      border: 'solid',
    }

    let backdropStyle = {
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    return (
      <div>
        <div style={modalStyle} className="modalPopup">
	        <button className="x" onClick={e => this.close(e)}>
	            X
	        </button>
	        {this.props.children}
        </div>
        <div style={backdropStyle} className="modalBackground" /*onClick={e => this.close(e)}*//>
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    this.props.updateFare("reset")
    this.props.updateNumPassengers(0,0,0,0);
    this.props.updateNumMilitary(0);
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

class NumPets extends Component {
  render() {
    return (
      <div className="NumPets">
      	<input className="pass_input" value={this.props.numPets} type="input_bar"/>
      </div>
    );
  }
}

class NumMilitary extends Component {
  render() {
    return (
      <div className="NumMilitary">
        <input className="pass_input" value={this.props.numMilitary} type="input_bar"/>
      </div>
    );
  }
}

class Military extends Component {
  /*constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.checked){
      this.props.updateLoading(true);
      this.props.updateNumMilitary(1);
      this.props.updateFare(this.props.origin,this.props.destination,this.props.numPassengers.adults,this.props.numMilitary+1,
                            this.props.numPassengers.seniors,this.props.numPassengers.children,this.props.numPassengers.pets);
    }else{
      this.props.updateLoading(true);
      this.props.updateNumMilitary(-1);
      this.props.updateFare(this.props.origin,this.props.destination,this.props.numPassengers.adults,this.props.numMilitary-1,
                            this.props.numPassengers.seniors,this.props.numPassengers.children,this.props.numPassengers.pets);
    }
  };

	createOptions(id) {
		return (
			<div key={id}>
				Military?
				<input ref={id} key={id} type="checkbox" onChange={event => this.handleChange(event)}/>
			</div>
		);
	}

	render() {
		return (
			<div className="Military">
			{this.props.inMilitary.map((currOption, index) => this.createOptions(index+1))}
			</div>
		);
	}*/
  lessMilitary = () => {
    if(this.props.numMilitary > 0){
      this.props.updateLoading(true);
      this.props.updateFare(this.props.origin,this.props.destination,this.props.numPassengers.adults,this.props.numMilitary-1,this.props.numPassengers.seniors,this.props.numPassengers.children,this.props.numPassengers.pets);
      this.props.updateNumMilitary(-1);
    }
  };

  moreMilitary = () => {
    if(this.props.numMilitary < this.props.numPassengers.adults){
      this.props.updateLoading(true);
      this.props.updateFare(this.props.origin,this.props.destination,this.props.numPassengers.adults,this.props.numMilitary+1,this.props.numPassengers.seniors,this.props.numPassengers.children,this.props.numPassengers.pets);
      this.props.updateNumMilitary(1);
    }
    if(this.props.numPassengers.adults === this.props.numMilitary){
      alert('Military discounts are limited 1 per adult. Please add another adult first.');
    }
  };

  render() {
    return (
      <div className="PassengerCount">
        <div className="NumPassType">
          <LessPass lessPass={this.lessMilitary}/>
            <NumMilitary numMilitary={this.props.numMilitary}/>
          <MorePass morePass={this.moreMilitary}/>
        </div>
        <div className="PassengerDescription">
          <div className="PassengerType">Military</div>
          <div className="PassengerAge">(1 per Adult)</div>
        </div>
      </div>
    );
  }
}

class FareLoader extends Component {
  render() {
    if(this.props.fareLoading){
      return(
        <div className="fareLoader"></div>
      );
    }else{
      return null;
    }
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
    var prevPetsCount = this.props.numPassengers.pets;
    if(currAdultsCount <= 0 && prevSeniorsCount <= 0 && (prevChildrenCount > 0 || prevPetsCount > 0)){
      alert("There must be at least 1 adult or 1 senior to book a child or pet ticket.");
      return;
    }
    if(prevAdultsCount > 0){
      this.updateLoading(true);
      if(this.props.numMilitary === prevAdultsCount){
        this.props.updateNumMilitary(-1);
      }
      this.props.updateNumPassengers(currAdultsCount,prevSeniorsCount,prevChildrenCount,prevPetsCount);
      this.props.updateFare(this.props.origin,this.props.destination,currAdultsCount,this.props.numMilitary-1,prevSeniorsCount,prevChildrenCount,prevPetsCount);
    }
  };

  moreAdults = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var currAdultsCount = prevAdultsCount+1;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    var prevPetsCount = this.props.numPassengers.pets;
    if(prevAdultsCount + prevSeniorsCount + prevChildrenCount < 8){
      this.updateLoading(true);
      this.props.updateNumPassengers(currAdultsCount,prevSeniorsCount,prevChildrenCount,prevPetsCount);
      this.props.updateFare(this.props.origin,this.props.destination,currAdultsCount,this.props.numMilitary,prevSeniorsCount,prevChildrenCount,prevPetsCount);
    }else{
      alert("For parties of 9 or more, email for booking.");
    }
  };

  lessSeniors = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var currSeniorsCount = prevSeniorsCount-1;
    var prevChildrenCount = this.props.numPassengers.children;
    var prevPetsCount = this.props.numPassengers.pets;
    if(currSeniorsCount <= 0 && prevAdultsCount <= 0 && (prevChildrenCount > 0 || prevPetsCount > 0)){
      alert("There must be at least 1 adult or 1 senior to book a child or pet ticket.");
      return;
    }
    if(prevSeniorsCount > 0){
      this.updateLoading(true);
      this.props.updateNumPassengers(prevAdultsCount,currSeniorsCount,prevChildrenCount,prevPetsCount);
      this.props.updateFare(this.props.origin,this.props.destination,prevAdultsCount,this.props.numMilitary,currSeniorsCount,prevChildrenCount,prevPetsCount);
    }
  };

  moreSeniors = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var currSeniorsCount = prevSeniorsCount+1;
    var prevChildrenCount = this.props.numPassengers.children;
    var prevPetsCount = this.props.numPassengers.pets;
    if(prevAdultsCount + prevSeniorsCount + prevChildrenCount < 8){
      this.updateLoading(true);
      this.props.updateNumPassengers(prevAdultsCount,currSeniorsCount,prevChildrenCount,prevPetsCount);
      this.props.updateFare(this.props.origin,this.props.destination,prevAdultsCount,this.props.numMilitary,currSeniorsCount,prevChildrenCount,prevPetsCount);
    }else{
      alert("For parties of 9 or more, email for booking.");
    }
  };

  lessChildren = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    var currChildrenCount = prevChildrenCount-1;
    var prevPetsCount = this.props.numPassengers.pets;
    if(prevChildrenCount > 0){
      this.updateLoading(true);
      this.props.updateNumPassengers(prevAdultsCount,prevSeniorsCount,currChildrenCount,prevPetsCount);
      this.props.updateFare(this.props.origin,this.props.destination,prevAdultsCount,this.props.numMilitary,prevSeniorsCount,currChildrenCount,prevPetsCount);
    }
  };

  moreChildren = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    var currChildrenCount = prevChildrenCount+1;
    var prevPetsCount = this.props.numPassengers.pets;
    if(prevAdultsCount === 0 && prevSeniorsCount === 0){
      alert("There must be at least 1 adult or 1 senior to book a child's ticket.");
      return;
    }else if(prevAdultsCount + prevSeniorsCount + prevChildrenCount < 8){
      this.updateLoading(true);
      this.props.updateNumPassengers(prevAdultsCount,prevSeniorsCount,currChildrenCount,prevPetsCount);
      this.props.updateFare(this.props.origin,this.props.destination,prevAdultsCount,this.props.numMilitary,prevSeniorsCount,currChildrenCount,prevPetsCount);
    }else{
      alert("For parties of 9 or more, email for booking.");
    }
  };

  lessPets = () => {
  	var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    var prevPetsCount = this.props.numPassengers.pets;
    var currPetsCount = prevPetsCount-1;
    if(prevPetsCount > 0){
      this.updateLoading(true);
      this.props.updateNumPassengers(prevAdultsCount,prevSeniorsCount,prevChildrenCount,currPetsCount);
      this.props.updateFare(this.props.origin,this.props.destination,prevAdultsCount,this.props.numMilitary,prevSeniorsCount,prevChildrenCount,currPetsCount);
    }
  };

  morePets = () => {
    var prevAdultsCount = this.props.numPassengers.adults;
    var prevSeniorsCount = this.props.numPassengers.seniors;
    var prevChildrenCount = this.props.numPassengers.children;
    var prevPetsCount = this.props.numPassengers.pets;
    var currPetsCount = prevPetsCount+1;
    if(prevAdultsCount === 0 && prevSeniorsCount === 0){
      alert("There must be at least 1 adult or 1 senior to add a pet.");
      return;
    }else if(prevPetsCount < 2){
      this.updateLoading(true);
      this.props.updateNumPassengers(prevAdultsCount,prevSeniorsCount,prevChildrenCount,currPetsCount);
      this.props.updateFare(this.props.origin,this.props.destination,prevAdultsCount,this.props.numMilitary,prevSeniorsCount,prevChildrenCount,currPetsCount);
    }else{
      alert("Cannot bring more than 2 pets.");
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
  };

  updateLoading = (loading) => {
    this.props.updateFareLoading(loading);
  };

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
            <div className="PassengerAge">(Ages 13-64)</div>
          </div>
          <div className="NumPassType">
            <LessPass lessPass={this.lessSeniors}/>
              <NumSeniors numSeniors={this.props.numPassengers.seniors}/>
            <MorePass morePass={this.moreSeniors}/>
          </div>
          <div className="PassengerDescription">
            <div className="PassengerType">Seniors</div>
            <div className="PassengerAge">(Ages 65+)</div>
          </div>
          <div className="NumPassType">
            <LessPass lessPass={this.lessChildren}/>
              <NumChildren numChildren={this.props.numPassengers.children}/>
            <MorePass morePass={this.moreChildren}/>
          </div>
          <div className="PassengerDescription">
            <div className="PassengerType">Children</div>
            <div className="PassengerAge">(Ages 2-12)</div>
          </div>
          <div className="NumPassType">
            <LessPass lessPass={this.lessPets}/>
              <NumPets numPets={this.props.numPassengers.pets}/>
            <MorePass morePass={this.morePets}/>
          </div>
          <div className="PassengerDescription">
            <div className="PassengerType">Pets</div>
            <div className="PassengerAge">(limit 2)</div>
          </div>
        </div>
        <Military inMilitary={new Array(this.props.numPassengers.adults).fill(true)} numMilitary={this.props.numMilitary}
                  updateNumMilitary={(numMilitary) => this.props.updateNumMilitary(numMilitary)}
                  updateFare={(origin,destination,adults,military,seniors,children,pets) => this.props.updateFare(origin,destination,adults,military,seniors,children,pets)}
                  numPassengers={this.props.numPassengers} origin={this.props.origin} destination={this.props.destination}
                  updateLoading={(loading) => this.updateLoading(loading)}/>
        <div className="fareBook">
          <FareLoader fareLoading={this.props.fareLoading}/>
	        <div className="fare">Fare: ${this.props.fare}</div>
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
    fetch('http://railroadbackend.appspot.com/passengers/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname: this.refs.first_name.value,
        lname: this.refs.last_name.value,
        email: this.refs.email.value,
        preferred_card_number: this.refs.cc_num.value,
        preferred_billing_address: this.refs.address.value,
      }),
    }).then(res => res.json()).then(passenger => {
      fetch('http://railroadbackend.appspot.com/reservations/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservation_date: this.props.date.format("YYYY-MM-DD"),
          paying_passenger: passenger.passenger_id,
          card_number: passenger.preferred_card_number,
          billing_address: passenger.preferred_billing_address,
        }),
      });
    });

		this.props.updateNumPassengers(0,0,0,0);
		this.props.updateConfirmPassCount();
		this.props.updateShowResults(true);
		this.props.onClose();
	}

	render() {
		if(!this.state.display){
			return null;
		}
		return (
			<form className="ReservationSpecs">
				<div>
					<input ref="first_name" className="form_input" placeholder="First Name"/>
					<input ref="last_name" className="form_input" placeholder="Last Name"/>
					<input ref="email" className="form_input" placeholder="Email"/>
          <input ref="cc_num" className="form_input" placeholder="Credit Card #"/>
          <input ref="address" className="form_input" placeholder="Address"/>
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
      availableTrips: this.props.availableTrips,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      date: nextProps.date,
      display: nextProps.showResults,
      availableTrips: nextProps.availableTrips,
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

  handleClick(trip) {
    this.openModal();
    this.props.updateTrainID(trip.train);
  }

  updateConfirmPassCount = () => {
  	this.setState({
  		confirmPassCount: !this.state.confirmPassCount,
  	});
  };

  createTrips = (trip) => {
  	return (
  		<tr key={trip.train} className="tripRow" onClick={() => this.handleClick(trip)}>
  			<td>{trip.train}</td>
	        <td>{trip.departure_time}</td>
	        <td>{trip.arrival_time}</td>
	        <td>{trip.seats_free}</td>
	        <td>{trip.date}</td>
	    </tr>
  	);
  }

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
              	<th>Train No.</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Available Seats</th>
                <th>Date</th>
              </tr>
              {this.state.availableTrips.map(this.createTrips)}
            </tbody>
          </table>
        </div>
        <Modal className="Modal" isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} 
        		confirmPassCount={this.state.confirmPassCount} updateConfirmPassCount={() => this.updateConfirmPassCount()}
        		updateNumPassengers={(adults,seniors,children,pets) => this.props.updateNumPassengers(adults,seniors,children,pets)}
            updateFare={(origin,destination,adults,military,seniors,children,pets) => this.props.updateFare(origin,destination,adults,military,seniors,children,pets)}
            updateNumMilitary={(numMilitary) => this.props.updateNumMilitary(numMilitary)}>
            <ReservationSpecs confirmPassCount={this.state.confirmPassCount} updateConfirmPassCount={() => this.updateConfirmPassCount()} 
            					numPassengers={this.props.numPassengers} updateNumPassengers={(adults,seniors,children,pets) => this.props.updateNumPassengers(adults,seniors,children,pets)} 
            					date={this.props.date} numMilitary={this.props.numMilitary} updateNumMilitary={(numMilitary) => this.props.updateNumMilitary(numMilitary)}
                      fare={this.props.fare} updateFare={(origin,destination,adults,military,seniors,children,pets) => this.props.updateFare(origin,destination,adults,military,seniors,children,pets)}
                      origin={this.props.origin} destination={this.props.destination} fareLoading={this.props.fareLoading} 
                      updateFareLoading={(fareLoading) => this.props.updateFareLoading(fareLoading)}/>
            <PassengerSpecs confirmPassCount={this.state.confirmPassCount} updateConfirmPassCount={() => this.updateConfirmPassCount()} numPassengers={this.props.numPassengers} 
            				updateNumPassengers={(adults,seniors,children,pets) => this.props.updateNumPassengers(adults,seniors,children,pets)} 
            				updateShowResults={(booked) => this.props.updateShowResults(booked)} onClose={() => this.closeModal()} date={this.props.date}
                    fare={this.props.fare} updateFare={(origin,destination,adults,military,seniors,children,pets) => this.props.updateFare(origin,destination,adults,military,seniors,children,pets)}/>
        </Modal>
      </div>
    );
  }
}

class TripsLoader extends Component {
  render() {
    if(this.props.tripsLoading){
      return (
        <div className="tripsLoader"></div>
      );
    }else{
      return null;
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      stations: [],
      trains: [],
      stops_at: [],
      availableTrips: [],
      //numPassengers: 1,
      numPassengers: {
        adults: 0,
        seniors: 0,
        children: 0,
        pets: 0,
      },
      numMilitary: 0,
      showResults: false,
      origin: "",
      destination: "",
      fare: 0,
      trainID: 0,
      tripsLoading: false,
      fareLoading: false,
    };
  };

/*
  componentDidUpdate() {
  	var trips = this.state.availableTrips.sort((a,b) => a.departure_time > b.departure_time);
  	console.log(trips);
  	if(this.state.availableTrips != trips){
  		console.log(trips);
  		this.setState({
  			availableTrips: trips,
  		});
  	}else{
  		return;
  	}
  }
*/

  componentWillMount() {
	Promise.all([
      fetch('https://railroadbackend.appspot.com/stations/').then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/trains/').then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/stops_at/').then(res => res.json()),
    ]).then(([stations, trains, stops_at]) => {
    	this.setState({
	  		stations: stations,
	  		trains: trains,
	  		stops_at: stops_at,
	  	});
    });
  }

  updateShowResults = (booked) => {
  	if(booked){
	    this.setState({
	      showResults: false,
	    });
	}else{
		this.setState({
	      showResults: true,
	    });
	}
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

  updateNumPassengers = (newAdults,newSeniors,newChildren,newPets) => {
    this.setState({
      numPassengers: {
        adults: newAdults,
        seniors: newSeniors,
        children: newChildren,
        pets: newPets,
      }
    });
  };

  updateNumMilitary = (updateMil) => {
    if(updateMil === 1){
      this.setState({
        numMilitary: this.state.numMilitary+1,
      });
    }else if(updateMil === -1){
      this.setState({
        numMilitary: this.state.numMilitary-1,
      });
    }else if(updateMil === 0){
      this.setState({
        numMilitary: 0,
      });
    }
  };

  updateOrigin = (origin) => {
    this.setState({
      origin: origin,
    });
  };

  updateDestination = (destination) => {
    this.setState({
      destination: destination,
    });
  };

  updateFare = (origin,destination,adults,military,seniors,children,pets) => {
    if(origin === "reset"){
      this.setState({
        fare: 0
      });
    }else{
      var originID = this.state.stations.find(s => s.station_name.replace(/\s/g, '') === origin.replace(/\s/g, '')).station_id;
      var destinationID = this.state.stations.find(s => s.station_name.replace(/\s/g, '') === destination.replace(/\s/g, '')).station_id;
      fetch('https://railroadbackend.appspot.com/calc_trip_fare/' + this.state.date.format("YYYY-MM-DD") + '/' + originID + '/' + destinationID + '/' + adults + '/' + military + '/' + seniors + '/' + children + '/' + pets + '/').then(res => res.json().then((fare) => {
        this.setState({
          fare: fare.fare,
          fareLoading: false,
        });
      }));
    }
  };

  updateTrainID = (newTrainID) => {
    this.setState({
      trainID: newTrainID
    });
  };

  updateTripsLoading = (tripsLoading) => {
    this.setState({
      tripsLoading: tripsLoading
    });
  };

  updateFareLoading = (fareLoading) => {
    this.setState({
      fareLoading: fareLoading
    });
  };

  loadTrips = (date,origin,originID,destination,destinationID,trainID,availableTrips) => {
  	var trip = {};
  	fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + trainID).then(res => res.json()).then(res => {
		trip.date = date;
		trip.departure_time = this.state.stops_at.find(s => s.train === trainID && s.station === originID).time_out;
		trip.arrival_time = this.state.stops_at.find(s => s.train === trainID && s.station === destinationID).time_in;
		trip.origin = origin;
		trip.destination = destination;
		trip.seats_free = res.seats_free;
		trip.train = trainID;
		if(trip.seats_free > 0){
			availableTrips.push(trip);
		}
		}).then(() => {
			this.setState({
				availableTrips: availableTrips,
			});
		});
  }

  findAvailableTrips(date,origin,destination) {
    /*
    var availableTrips = [];
    try {
      var originID = this.state.stations.find(s => s.station_name.replace(/\s/g, '') === origin.replace(/\s/g, '')).station_id;
      var destinationID = this.state.stations.find(s => s.station_name.replace(/\s/g, '') === destination.replace(/\s/g, '')).station_id;
      for(let i = 1; i <= 28; i++){
        this.loadTrips(date.format("YYYY-MM-DD"),origin,originID,destination,destinationID,i,availableTrips);
      }
    }
    catch(error) {
      console.error(error);
    }
    */

    date = date.format("YYYY-MM-DD");
  	var availableTrips = [];
  	try {
		var originID = this.state.stations.find(s => s.station_name.replace(/\s/g, '') === origin.replace(/\s/g, '')).station_id;
		var destinationID = this.state.stations.find(s => s.station_name.replace(/\s/g, '') === destination.replace(/\s/g, '')).station_id;
    Promise.all([
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 1).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 2).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 3).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 4).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 5).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 6).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 7).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 8).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 9).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 10).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 11).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 12).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 13).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 14).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 15).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 16).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 17).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 18).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 19).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 20).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 21).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 22).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 23).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 24).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 25).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 26).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 27).then(res => res.json()),
      fetch('https://railroadbackend.appspot.com/seats_free/' + date + '/' + originID + '/' + destinationID + '/' + 28).then(res => res.json())
    ]).then((seatsFree) => {
      this.updateTripsLoading(false);
      this.updateShowResults(false);
      for(var i = 1; i <= 28; i++){
        var trip = {};
        trip.date = date;
        trip.departure_time = this.state.stops_at.find(s => s.train === i && s.station === originID).time_out;
        trip.arrival_time = this.state.stops_at.find(s => s.train === i && s.station === destinationID).time_in;
        trip.origin = origin;
        trip.destination = destination;
        trip.seats_free = seatsFree[i-1].seats_free;
        trip.train = i;
        if(trip.seats_free > 0){
          availableTrips.push(trip);
        }
      }
      availableTrips = availableTrips.sort((a,b) => {
        var aDepart = a.departure_time.slice(0,2) + a.departure_time.slice(3,5) + a.departure_time.slice(6,8);
        var bDepart = b.departure_time.slice(0,2) + b.departure_time.slice(3,5) + b.departure_time.slice(6,8);
        return aDepart - bDepart;
      });
      return availableTrips;
    }).then(availableTrips => {
      this.setState({
        availableTrips: availableTrips,
      });
    });
  	}
  	catch(error) {
  		console.error(error);
  	}
  	//var originID = this.state.stations.find(s => s.station_name.replace(/\s/g, '') === origin.replace(/\s/g, '')).station_id;
  	//var destinationID = this.state.stations.find(s => s.station_name.replace(/\s/g, '') === destination.replace(/\s/g, '')).station_id;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={banner}  alt="" className="Banner"/>
        </header>
        <TripInfo date={this.state.date} updateDate={(date) => this.updateDate(date)} stations={this.state.stations.map(s => s.station_name)} numPassengers={this.state.numPassengers} 
        			updateShowResults={(booked) => this.updateShowResults(booked)}
        			findAvailableTrips={(date,origin,destination) => this.findAvailableTrips(date,origin,destination)}
              origin={this.state.origin} destination={this.state.destination} updateOrigin={(origin) => this.updateOrigin(origin)}
              updateDestination={(destination) => this.updateDestination(destination)} updateTripsLoading={(tripsLoading) => this.updateTripsLoading(tripsLoading)}/>
        <TripsLoader tripsLoading={this.state.tripsLoading}/>
        <Results showResults={this.state.showResults} updateShowResults={(booked) => this.updateShowResults(booked)} date={this.state.date} 
        			numPassengers={this.state.numPassengers} updateNumPassengers={(adults,seniors,children,pets) => this.updateNumPassengers(adults,seniors,children,pets)}
        			availableTrips={this.state.availableTrips} numMilitary={this.state.numMilitary} updateNumMilitary={(numMilitary) => this.updateNumMilitary(numMilitary)}
              fare={this.state.fare} updateFare={(origin,destination,adults,military,seniors,children,pets) => this.updateFare(origin,destination,adults,military,seniors,children,pets)}
              origin={this.state.origin} destination={this.state.destination} fareLoading={this.state.fareLoading} updateFareLoading={(fareLoading) => this.updateFareLoading(fareLoading)}
              trainID={this.state.trainID} updateTrainID={newTrainID => this.updateTrainID(newTrainID)}/>
      </div>
    );
  }
}

export default App;
