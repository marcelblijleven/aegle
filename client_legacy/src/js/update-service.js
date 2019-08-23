function updateService(message) {
  const name = message.serviceName
  const status = document.querySelector(
    `[status-title="${name}"]`
  )
  const updatedAt = document.querySelector(
    `[updated-at-title="${name}"]`
  )

  if (message.healthy) {
    status.setAttribute('class', 'badge badge-success')
  } else {
    status.setAttribute('class', 'badge badge-danger')
  }

  status.innerText = message.healthy ? 'healthy' : 'unhealthy'
  updatedAt.innerText = new Date().toLocaleString('nl')
}
