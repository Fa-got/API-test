import { Router } from "express";
import bodyParser from "body-parser";
import https from 'https';


const router = Router();
router.use(bodyParser.json());

router.get('/api/foursquare', (req, res) => {
	const id = 'TNDJT5F0LLO21HARFDFO0CMEIJJGFQWGIDGQPD5JF3QRJHRT';
	const secret = 'V4JBIGWYO14K5LA3HPRCRPBZXPFVBERYBEJX15EF3DHUDO5V';
	const word = req.query.loc;

	 const url = `https://api.foursquare.com/v2/venues/explore?client_secret=${secret}&client_id=${id}&v=20161101&limit=50&near=${word}`
	https.get(url, (response) => {
	    let body ='';
	    response.on('data', (chunk) => {
			body += chunk;
	    });
	    response.on('end', () => {

			const places = JSON.parse(body);
			const locations = places.response;
			if(places.meta.code !== 200){
				res.json('NO RESULT')
				res.end()
			}else{
				let comment =[];
				if(locations.groups[0].items[0].tips === undefined){
					comment = ['no comments'];
				}else{
					locations.groups[0].items[0].tips.map(val =>{
						comment.push(val.text);
					})
				}
				const parseData = {
					address: locations.geocode.displayString,
					coordinates: locations.geocode.center,
					comments: comment
				}
				res.json(parseData)
			}
		
	    });
  	}).on('error', (e) =>  {
		console.log(" error: " + e.message);
  });

});

export default router;