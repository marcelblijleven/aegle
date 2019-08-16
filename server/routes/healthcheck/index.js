const healthcheck = require('express').Router()
const { store } = require('../../src/store')

function getHealthcheck(req, res) {
  data = store.json()
  res.type('json')
  res.status(200)
  res.send(data)
}

healthcheck.get('/', getHealthcheck)

module.exports = healthcheck
