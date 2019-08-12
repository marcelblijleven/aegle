const Express = require('express')
const socketio = require('socket.io')

const port = 3000

const app = new Express()

app.use('/src', Express.static(__dirname + '/src'))

// Setup app
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/index.html')
})

const server = app.listen(port, function() {
  console.info('Running client app on port', port)
})

// Setup socket server
const io = socketio(server)
