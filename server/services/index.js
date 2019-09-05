const path = require('path')
const fs = require('fs')
const createDynamicServices = require('../src/services/create-dynamic-services')
const verifyServices = require('../src/services/verify-services')
const paramUtils = require('../src/services/param-utils')

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
        if (paramUtils.isDynamic(requiredServices)) {
          services = services.concat(createDynamicServices(requiredServices))
        } else {
          services.push(requiredServices)
        }
      } else {
        for (const service of requiredServices) {
          if (paramUtils.isDynamic(service)) {
            services = services.concat(createDynamicServices(service))
          } else {
            services.push(service)
          }
        }
      }
    }
  })

  if (!verifyServices(services)) {
    console.error('Server: not all services match requirements')
    process.exit(1)
  }

  // Add properties to services
  for (const service of services) {
    service['id'] = 'a' + Math.random().toString(36).substr(2, 4)
    service['status'] = null
    service['updatedAt'] = null
    service['responseTimes'] = []
  }

  // Don't return the dynamic placeholder services
  return services.filter(service => service.params === undefined)
}

module.exports = getServices(directory)
