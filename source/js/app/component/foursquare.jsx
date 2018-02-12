import React, {Component, createElement} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Api from './../../../controller/foursquareData';

export default class Foursquare extends Component {
  constructor(props) {
    super(props)
    
    this.state = {value: '   Enter location example: Kiev, Brooklin'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

 handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
    this.getData(this.state.value);
  }


  getData(v) {
     return new Promise( resolve =>{
        Api.callData(v) 
          .then((obj) => {
            const data = obj;
            console.log('client foursquare data', data)
            resolve()
          })
    });
   
	}

  render() {
  return (
    <div className="foursquare">
    Foursquare API call:
      <form onSubmit={this.handleSubmit}>
        <label>
          <input className="text" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
    )
  }
}
