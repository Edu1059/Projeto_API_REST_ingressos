const express = require('express')
const router = require('./routes')
const bodyParser = require('body-parser')

require('./config/connection.js');

const app = express()

const mustacheExpress = require('mustache-express')
const engine = mustacheExpress()

app.engine("mustache", engine)
app.set("views", "./src/template")
app.set("view engine","mustache")

app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use(router)

module.exports = app