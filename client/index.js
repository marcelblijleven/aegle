const Express = require('express')
const socketio = require('socket.io')

const port = 3000

const app = new Express()

// Setup app
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

const server = app.listen(port, function() {
  console.info('Running client app on port', port)
})

// Setup socket server
const io = socketio(server)
