function updateService(message) {
  const name = message.serviceName
  const status = document.querySelector(
    `[status-title="${name}"]`
  )
  const modifiedAt = document.querySelector(
    `[modified-at-title="${name}"]`
  )

  status.innerText = message.healthy
  modifiedAt.innerText = new Date().toLocaleString('nl')
}
