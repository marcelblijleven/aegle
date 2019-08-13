const Express = require('express')
const socketio = require('socket.io')
const bodyParser = require('body-parser')

const Poller = require('./src/poller')
const Store = require('./src/store')
const getHealthCheck = require('./src/get-healthcheck')
const services = require('./services')

const port = process.env.port || 5000
const pollTime = 60 * 1000 // 60 seconds

// Creating new store
const store = new Store()

// Setup app
const app = new Express()
app.use(bodyParser.json())
app.set('json spaces', 2)

app.get('/', function(req, res) {
  res.type('html')
  res.status(200)
  res.send('<h1>aegleJS server</h1>')
})

app.get('/services', function(req, res) {
  res.type('json')
  res.status(200)
  res.send(services)
})

app.get('/healthcheck', function(req, res) {
  const healthcheck = store.json()
  res.type('json')
  res.status(200)
  res.send(healthcheck)
})

app.post('/update', function(req, res) {
  console.info('Updating services')
  pollServices(services)
  res.status(200)
  res.send()
})

// Setup server
let server = app.listen(port, function() {
  console.info('Running app on port', port)
})

// Setup socket server
let io = socketio(server)

io.on('connection', function(socket) {
  console.info('Socket connected with ID', socket.id)
  socket.emit('services', services) // Emit services to client
  pollServices(services) // Initial poll
})

function updateService(result) {
  if (result) {
    store.set(result.serviceName, result.healthy)
    io.sockets.emit('update service', result)
    return
  }

  console.info(`No status update to send for service ${result.serviceName}.`)
}

async function pollServices(services) {
  for (const service of services) {
    try {
      const result = await getHealthCheck(service)
      updateService(result)
    }
    catch(error) {
      console.error(error.message)
    }
  }
}

// Start polling
const poller = new Poller(() => pollServices(services), pollTime)
poller.start()
