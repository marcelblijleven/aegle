function checkParams(url, params) {
  const paramNames = Object.getOwnPropertyNames(params)

  // Check if placeholder is in url
  for (name of paramNames) {
    if (!url.includes(`{${name}}`)) {
      throw new Error(`No placeholder found in url for param ${name}`)
    }
  }

  return true
}

function getAllParamCombinations(service) {
	const names = Object.getOwnPropertyNames(service.params)
	let results = [[]]
  for (const name of names) {
    let subArray = service.params[name]
    let tempArray = []
    for (const subResult of results) {
      for (const value of subArray) {
        const keyValue = {}
        keyValue[name] = value
        tempArray.push(subResult.concat(keyValue))
      }
    }
    results = tempArray
  }
  const combinations = []

  for (const result of results) {
    combinations.push(Object.assign({}, ...result))
  }

	return combinations
}

function isDynamic(service) {
  if (service.params === undefined) {
    return false
  }

  return checkParams(service.url, service.params)
}

module.exports = {
  checkParams,
  getAllParamCombinations,
  isDynamic,
}