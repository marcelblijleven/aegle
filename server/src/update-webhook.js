const fetch = require('node-fetch')

module.exports = async function(message) {
  if (!process.env.WEBHOOK) {
    console.error('Server: tried calling webhook update without configured webhook url')
    return
  }

  try {
    const body = JSON.stringify({text: message})
    console.info('Server: sending message to webhook')
    await fetch(process.env.WEBHOOK, {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  catch (error) {
    console.error(error.message)
  }
}
