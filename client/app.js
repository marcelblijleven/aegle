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
  console.info('Client: running on port', port)
})

// Setup socket server
const io = socketio(server)

process.on('SIGINT', function() {
  console.info('Client: shutting down')
  process.exit(0)
})

