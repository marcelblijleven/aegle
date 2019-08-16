const app = require('express')()
const routes = require('./routes')

const socketio = require('socket.io')
const bodyParser = require('body-parser')

const Poller = require('./src/poller')
const { initialiseStore } = require('./src/store')
const services = require('./services')
const pollServices = require('./src/poll-services')

const port = process.env.port || 5000
const pollTime = 60 * 1000 // 60 seconds

// Initialise store
initialiseStore(services)

const io = socketio()

// Setup socket middleware
app.use(function(req, res, next) {
  res.locals['socketio'] = io
  next()
})

// Setup app
app.use('/', routes)
app.use(bodyParser.json())
app.set('json spaces', 2)

// Setup server
const server = app.listen(port, function() {
  console.info('Server: running on port', port)
})

// Attach socket to server
io.attach(server)

io.on('connection', function(socket) {
  console.info('Server: Socket connected with ID', socket.id)
  socket.emit('services', services) // Emit services to client
  pollServices(services, io) // Initial poll
})

// Start polling
const poller = new Poller(() => pollServices(services, io), pollTime)
poller.start()
