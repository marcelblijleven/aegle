const props = ['name', 'url']

function serviceHasAbsoluteUrl(service) {
  /** Url validation from DEVSHED */
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  if (!validURL(service.url)) {
    console.error('Server: service url is incorrect', service)
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

module.exports = {
  verifyServices
}
