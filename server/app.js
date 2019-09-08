require('dotenv').config({path: __dirname + '/.env'})
const app = require('express')()
const routes = require('./routes')

const socketio = require('socket.io')
const bodyParser = require('body-parser')

const Poller = require('./src/poller')
const { initialiseStore } = require('./src/store')
const services = require('./services')
const pollServices = require('./src/services/poll-services')
const getHealthcheck = require('./src/healthcheck/get-healthcheck')
const updateService = require('./src/services/update-service')

const port = process.env.SERVER_PORT || 5000
const pollTime = process.env.POLL_TIMER || 60 * 1000

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
  pollServices(services, io)

  socket.on('service:update', function(id, fn) {
    const service = services.find(service => service.id === id)

    if (service !== undefined) {
      getHealthcheck(service, io, updateService)
        .then(() => fn({ 
          success: true,
          text: 'Service successfully updated', 
        }))
        .catch((error) => fn({ 
          success: false, 
          text: error.message 
        }))
    } else {
      fn({ 
        success: false,
        text: 'Could not find service'
      })
    }
  })
})

// Start polling
const poller = new Poller(() => pollServices(services, io), pollTime)
poller.start()

process.on('SIGINT', function() {
  console.info('Server: shutting down')
  process.exit(0)
})
