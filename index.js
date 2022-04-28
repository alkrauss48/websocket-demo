// Dependency requires
const express = require('express')
const { createServer } = require('http')
const path = require('path')

// App requires
const connection = require('./src/connection')

// Initial variables
const app = express()
const httpServer = createServer(app)

// Let express serve up the public assets
app.use(express.static(path.join(__dirname, 'public')))

// Initialize the websocket connection
connection.init(httpServer)

// Host the server
httpServer.listen(7070)
