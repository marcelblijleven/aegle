function loadServices(message) {
  const parent = document.querySelector('tbody')

  // Remove all children from tbody to prevent loading duplicates
  while (parent.firstChild) {
    parent.firstChild.remove()
  }

  // Loop through services and add them to tbody
  for (const service of message) {
    const row = document.createElement('TR')
    const rowName = document.createElement('TD')
    const rowStatus = document.createElement('TD')

    rowName.innerText = service.name
    rowStatus.innerText = 'pending update' // Initital status
    rowStatus.setAttribute('data-title', service.name)

    // Add td to row, and row to tbody
    row.appendChild(rowName)
    row.appendChild(rowStatus)
    parent.appendChild(row)
  }
}

module.exports = loadServices
