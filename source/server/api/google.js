import { Router } from "express";
import bodyParser from "body-parser";
import https from 'https';

const router = Router();
router.use(bodyParser.json());

router.get('/api/google', (req, res) => {
	const key = 'AIzaSyBo9ZPxpKoXNQWDHdS5QjDK_l23Rc5oNug';
	const loc = req.query.loc;
	const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="+key+"&location="+loc+"&radius=10000&sensor=false&types=*&keyword=fast";

	https.get(url, (response) => {
	    let body ='';
	    response.on('data', (chunk) => {
			body += chunk;
	    });
	    response.on('end', () => {
			const places = JSON.parse(body);
			const locations = places.results;
			const randLoc = locations[Math.floor(Math.random() * locations.length)];
			if(randLoc === undefined){
				res.json('NO RESULT')
			}else{
				const parseData = {
					address: randLoc.vicinity,
					coordinates: randLoc.geometry.location,
					types: randLoc.types
				}
				res.json(parseData)
			}
			
	    });
  	}).on('error', (e) =>  {
		console.log(" error: " + e.message);
  });

});

export default router;