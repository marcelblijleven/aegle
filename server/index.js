const Express = require('express')
const bodyParser = require('body-parser')

const services = require('./services')

const port = process.env.port || 5000

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
