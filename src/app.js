const express = require('express')
const router = require('./routes')

require('./config/connection.js');

const app = express()
app.use(express.json())
app.use(router)

module.exports = app