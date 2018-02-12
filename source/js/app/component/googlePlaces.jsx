import React, {Component, createElement} from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Api from './../../../controller/googlePlaceData';

export default class Google extends Component {
  constructor(props) {
    super(props)
    this.state = { address: 'Enter address' };
    this.onChange = (address) => this.setState({ address });
  }

handleSubmit (event) {
    event.preventDefault()
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.getData(latLng.lat +','+latLng.lng))
      .catch(error => console.error('Error in handleSubmit', error))
  }
  
  getData(v) {
     return new Promise( resolve =>{
        Api.callData(v) 
          .then((obj) => {
            const data = obj;
            console.log('client google data', data)
            resolve()
          })
    })
   
	}

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div className="google">
      Google API call:
        <form onSubmit={this.handleSubmit.bind(this)}>
          <PlacesAutocomplete inputProps={inputProps} />
          < button type="submit" >Submit</button>
        </form>
      </div>

    )
  }
}
