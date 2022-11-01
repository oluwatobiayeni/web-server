const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()
//Define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')
//setup handlebars engine and views loation
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'Oluwatobi Ayeni' 
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Oluwatobi Ayeni'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Oluwatobi Ayeni',
        title:'help',
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address) {
        return res.send({
            error:'you must enter an address'
        })
    } 
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastdata) =>{
            if (error) {
                return res.send({
                    error 
                })
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
            
        })
    })  
})

app.get('/product',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('view',{
        title: 'view',
        message:'Help article not found',
        name:'Oluwatobi Ayeni'
    })
})

app.get('*',(req,res)=>{
    res.render('view',{
        title: 'view',
        message:'page not found',
        name:'Oluwatobi Ayeni'
    }) 
})
app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})