const isAbsoluteUrl = require('is-absolute-url')

const props = ['name', 'url', 'healthyValue']

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

    return check && serviceHasAbsoluteUrl(obj)
  }
}

module.exports = verifyServices
