var request = require('request')



const forcast =({longitude,latitude}, callback)=>{  // data -> {longitude,latitude}

	// const {longitude,latitude}=data
	var url='http://api.weatherstack.com/current?access_key=bdc74beff568ce1cff03b812b06c364c&query='+longitude+','+latitude+'&units=f'
request({url, json:true}, (error, {body}) => {  // convert the response to object format & response -> {body}

	// var data= JSON.parse(reponse.body)

	// console.log(data.location)
	
if (error){
		callback('connection problem', undefined)
	}
else if(body.error){callback('unable to connect to this location', undefined)}
	else{
		var temperature= body.current.temperature;

		var fl= body.current.feelslike;

		callback(undefined,'the temperature outside is '+temperature+' it feels like  '+fl)}


})}




module.exports=forcast