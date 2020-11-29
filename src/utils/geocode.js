const request = require('request')


const geocode= (address, callback) =>{

const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibW91c3Nhb3VpIiwiYSI6ImNraGRxbWl1NzAxczAyem9mNW1pcG0zdTcifQ.KlWCLe-veRbvEWtvsYuCdg&limit=1'

request({url, json:true}, (error,response)=>
{
	if (error){callback('unable to connect to the location of services', undefined)}
	else if(response.body.features.lenght ===0){callback('unable to find the location', undefined)}	
	else {
		
		 	const  latitude=response.body.features[0].center[0]
		 	const  longitude=response.body.features[0].center[1]
			const  location=response.body.features[0].place_name 

			const info={latitude,longitude,location}

		
			// console.log(info)
		callback(undefined, info)}

})}



module.exports=geocode