function updateService(message) {
  const serviceName = message.serviceName
  const serviceStatus = message.healthy
  const service = document.querySelector(
    `[data-title="${serviceName}"]`
  )

  service.innerText = serviceStatus
}
