
const request = require('request')
const geocode=require('./utils/geocode.js')
const forcast=require('./utils/forcast.js')
// const prompt = require('prompt-sync')()
const path =require('path')
const express= require('express')
const hbs = require('hbs')

const app= express()

const port = process.env.PORT || 3000

// define path for express config

const publicDipath= path.join(__dirname, '../public') // return the path of index.html
const viewsPath = path.join(__dirname, '../views-changed-name/views')
const partialsPath = path.join(__dirname, '../views-changed-name/partials')

// setup handelbars engine and vies location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server

app.use(express.static(publicDipath)) 

app.get('', (req,res) =>
	{
		res.render('index',{title: 'Wheather', name:'moussaoui'})
	})
app.get('/about', (re,res) => {
	res.render('about',{title: 'About', name:'moussaoui'})
})

app.get('/help', (req,res) => {
	res.render('help',{title: 'Help', name:'moussaoui'})
})
app.get('/help/*', (req, res) => {
 res.render('404', {
 title: '404',
 name: 'moussaoui',
 errorMessage: 'help document not found'
 })
})



app.get('/weather',(req,res) => {

	if (!req.query.address){
		return res.send({error: 'you need to provide an address'})
	}

geocode(req.query.address, (error, data = {}) =>

{  
	if (error){return res.send(error)}
	                                   // for an object we don't use '+' we use ','
	forcast(data,(error,forcastdata)=>{
		if (error) {return res.send(error)}
	res.send( {
		location: data.location,
		data:forcastdata,
		address: req.query.address
	})
})

})
})




app.get('*', (req, res) => {
 res.render('404', {
 title: '404',
 name: 'moussaoui',
 errorMessage: 'Page not found'
 })
})
// app.get('',(req,res) => {

// 	res.send(' this is express app')
// })

// app.get('/help',(req,res) => {

// 	res.send('help')
// })

// app.get('/about',(req,res) => {

// 	res.send(' <h1> About <\h1>')
// })


app.listen(port, () =>{console.log('listening on port ' +port )})

