const path = require('path')
const fs = require('fs')
const verifyServices = require('../src/verify-services')

const directory = __dirname

function getServices(dir) {
  let services = []
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    if (path.extname(file) === '.js') {
      if (file === 'index.js') {
        return
      }
      const requiredServices = require(path.join(dir, file))

      if (!Array.isArray(requiredServices)) {
        services.push(requiredServices)
      } else {
        services = services.concat(requiredServices)
      }
    }
  })

  if (!verifyServices(services)) {
    console.error('Server: not all services match requirements')
    process.exit(1)
  }

  return services
}

module.exports = getServices(directory)
