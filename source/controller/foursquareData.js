import axios from "axios";

const Api = {
	callData: loc => {
		return new Promise((resolve, reject) => {
		axios.get(`/api/foursquare/?loc=${loc}`)
			.then((response) => {
	   			resolve(response.data);
	  	})
		.catch((error) => {
	        reject(error)
	     });
		})
	}
}

export default Api;
