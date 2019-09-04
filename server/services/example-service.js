const services = [
  {
    name: 'HttpStatus200 - after sleep 10 sec',
    url: 'https://httpstat.us/200?sleep=10000',
    healthyValue: '200 OK',
    type: 'text'
  },
  {
    name: 'HttpStatus524',
    url: 'https://httpstat.us/524?sleep=4000',
    healthyValue: '200 OK',
    type: 'text'
  },
  {
    name: 'HttpStatus200',
    url: 'https://httpstat.us/200',
    healthyValue: '200 OK',
    type: 'text'
  }
]

module.exports = services
