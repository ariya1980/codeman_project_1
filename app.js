const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')

const beverages = require('./routes/beverage')

const urlencodedParser = bodyParser.urlencoded({extended: true})

app.use(urlencodedParser)
// Middleware
app.use(function(req, res, next) {
  if (req.query && typeof req.query && '_method' in req.query) {
    const method = req.query._method
    delete req.query._method
    req.method = method
    req.url = req.path
    console.log("@@@@@@@@@@ : " + req.method)
    console.log("@@@@@@@@@@ : " + req.url)
  }
  next()
})

app.set('views','./views')
app.set('view engine', 'pug' )
app.use(express.static('public'))
app.use('/beverages',beverages)

app.all('*',function(request, response) {
    console.log('other' )
    response.redirect('/beverages')
})

app.listen(3002)