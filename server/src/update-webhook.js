const fetch = require('node-fetch')

async function postMessage(body) {
  const options = {
    method: 'post',
    body: body,
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(process.env.WEBHOOK, options)
  return response
}

function getBody(message) {
  if (process.env.WEBHOOK.includes('slack')) {
    return JSON.stringify({ text: message })
  }

  throw new Error('Webhook not implemented. Currently only Slack is implemented')
}

async function updateWebhook(message) {
  if (!process.env.WEBHOOK) {
    console.error('Server: tried calling webhook update without configured webhook url')
    return
  }

  try {
    console.info('Server: sending message to webhook')
    const body = getBody(message)
    const response = await postMessage(body)

    if (response.status !== 200) {
      throw new Error(`Webhook return http status ${response.status}.`)
    }
  }
  catch (error) {
    console.error('Server:', error.message)
  }
}

module.exports = updateWebhook
