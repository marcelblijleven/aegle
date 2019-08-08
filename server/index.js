const Express = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')

const Poller = require('./src/poller')
const getHealthCheck = require('./src/get-healthcheck')
const services = require('./services')

const port = process.env.port || 5000
const pollTime = 60 * 1000 // 60 seconds

// Setup app
const app = new Express()
app.use(bodyParser.json())
app.set('json spaces', 2)

app.get('/', function(req, res) {
  res.type('html')
  res.status(200)
  res.send('<h1>This is the aegleJS server</h1>')
})

app.get('/services', function(req, res) {
  res.type('json')
  res.status(200)
  res.send(services)
})

// Setup server
let server = app.listen(port, function() {
  console.info('Running app on port', port)
})

// Setup socket server
let io = socket(server)

io.on('connection', function(socket) {
  console.info('Socket connected with ID', socket)
  socket.emit('services', services) // Emit services to client
  pollServices(services) // Initial poll
})

function pollServices(services) {
  for (const service of services) {
    getHealthCheck(service)
      .then((result) => {
        io.sockets.emit('update service', result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// Start polling
const poller = new Poller(() => pollServices(services), pollTime)
poller.start()
