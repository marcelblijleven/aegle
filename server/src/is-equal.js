function isEqual(objA, objB) {
  if (typeof objA !== typeof objB) {
    return false
  }

  if (typeof objA !== 'object' && typeof objB !== 'object') {
    return objA === objB
  }

  // Determined both objects are typeof 'object'
  // Get property names
  const objAProps = Object.getOwnPropertyNames(objA)
  const objBProps = Object.getOwnPropertyNames(objB)

  // Check if length matches
  if (objAProps.length !== objBProps.length) {
    return false
  }

  for (const prop of objAProps) {
    if (objA[prop] !== objB[prop]) {
      return false
    }
  }

  return true
}

module.exports = isEqual
