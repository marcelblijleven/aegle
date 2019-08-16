function loadServices(message) {
  const parent = document.querySelector('tbody')

  // Remove all children from tbody to prevent loading duplicates
  while (parent.firstChild) {
    parent.firstChild.remove()
  }

  // Loop through services and add them to tbody
  for (const service of message) {
    let row = document.createElement('tr')
    let rowName = document.createElement('td')
    let rowStatus = document.createElement('td')
    let rowUpdated = document.createElement('td')
    let spanStatus = document.createElement('span')

    rowStatus.appendChild(spanStatus)
    rowName.innerText = service.name
    spanStatus.innerText = 'pending update' // Initital status
    spanStatus.setAttribute('status-title', service.name)
    rowUpdated.setAttribute('updated-at-title', service.name)

    // Add td to row, and row to tbody
    row.appendChild(rowName)
    row.appendChild(rowStatus)
    row.appendChild(rowUpdated)
    parent.appendChild(row)
  }
}
