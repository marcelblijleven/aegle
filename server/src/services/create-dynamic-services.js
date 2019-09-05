const { getAllParamCombinations } = require('./param-utils')

function createDynamicServices(service) {
  const services = []
  const combinations = getAllParamCombinations(service)

  for (const combination of combinations) {
    let newService = Object.assign({}, service)
    let url = service.url
    delete newService.params // Clean unneeded params property

    for (const property of Object.getOwnPropertyNames(combination)) {
      newService.name += `-${combination[property]}`
      url = url.replace(`{${property}}`, combination[property])
    }
    newService.url = url
    services.push(newService)
  }

  return services
}

module.exports = createDynamicServices
