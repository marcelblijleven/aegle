const isAbsoluteUrl = require('is-absolute-url')

const props = ['name', 'url', 'healthyValue', 'type']
const types = ['json', 'text', 'html']

function serviceHasValidType(service) {
   if (types.indexOf(service.type) === -1) {
     console.error(`Server: unknown type '${service.type}'`)
     return false
   }

   return true
}

function serviceHasAbsoluteUrl(service) {
  if (!isAbsoluteUrl(service.url)) {
    console.error('Server: service url should be absolute')
    return false
  }

  return true
}

function verifyServices(obj) {
  if (Array.isArray(obj)) {
    return obj.every(verifyServices)
  } else {
    let check = true
    for (const prop of props) {
      if (obj[prop] === undefined) {
        console.error(`Server: service has no property '${prop}'`)
        check = false
      }
    }

    return check && serviceHasAbsoluteUrl(obj) && serviceHasValidType(obj)
  }
}

module.exports = verifyServices
