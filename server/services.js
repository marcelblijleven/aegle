const path = require('path')
const fs = require('fs')

const directory = path.join(__dirname, 'services')

function getServices(dir) {
  let services = []
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    if (path.extname(file) === '.js') {
      const requiredServices = require(path.join(dir, file))

      if (!Array.isArray(requiredServices)) {
        services.push(requiredServices)
      } else {
        services = services.concat(requiredServices)
      }
    }
  })

  return services
}

module.exports = getServices(directory)
