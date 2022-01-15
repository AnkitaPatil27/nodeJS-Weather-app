const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')


const app = express()
//Define path for Express configuration.
const pathDirectory = path.join(__dirname ,'../public')
console.log(__dirname, '../partials')
const partialsPath = path.join(__dirname,'../partials')

//Set up handlebars engine.
app.set('view engine' , 'hbs')
hbs.registerPartials(partialsPath)
//Set up static directory to serve.
app.use(express.static(pathDirectory))


app.get('' , (req,res) => {
    res.render('index')
})

// app.get('/help' , (req,res) => {
//     res.render('help' ,{
//         title:"helping hands",
//         msg:'We are here to help you out.',
//         name:'Ben'
//     })
// })

// app.get('/about' , (req,res) => {
//     res.render('about',{
//         title:'About us',
//         price:20,
//         name:'Kelvin'
//     })
// })


app.get('/weathers' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Please specify the address.'
        })
    }
    geocode( req.query.address , (error,{ latitude, longitude, location }={}) => {
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })   
        
})
    


// app.get('/products' ,(req,res) => {
//     if(!req.query.search){
//         return res.send({
//             error:'Please provide the search query.'
//         })
//     }
//     res.send({
//         products :[]
//     })

//     console.log(req.query.search)
// })
// app.get('/help/*' ,(req,res) => {
//     res.render('404',{
//         errormsg:'Help Page not found.'
//     })
// })

// app.get('*' ,(req,res) => {
//     res.render('404' ,{
//         errormsg:'Page not found.'
//     })
// })

app.listen( 3000 , () => {
    console.log('Server running on port 3000')
})