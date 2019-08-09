const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').load()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)
//https://viblo.asia/p/xay-dung-restful-api-don-gian-voi-nodejs-1Je5EdewlnL
//https://stackoverflow.com/questions/56047981/node-js-heroku-deployment-on-mac-sh-1-nodemon-not-found-npm-err-nodemon
//https://stackoverflow.com/questions/47706022/error-cannot-find-module-cors
//debuger https://www.youtube.com/watch?v=Ypocng-cxVA
