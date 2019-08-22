const updateWebhook = require('../../src/update-webhook')
const fetch = require('node-fetch')
jest.mock('node-fetch')

describe('updateWebhook', function() {
  afterEach(function() {
    jest.resetAllMocks()
  })
  
  test('It should not update webhook when no webhook url is set', function() {
    console.error = jest.fn()
    updateWebhook('testmessage')
    expect(console.error).toHaveBeenCalled()
    expect(fetch).not.toHaveBeenCalled()
  })

  test('It should not update webhook when webhook url is empty', function() {
    process.env.WEBHOOK = ''
    console.error = jest.fn()
    updateWebhook('testmessage')
    expect(console.error).toHaveBeenCalled()
    expect(fetch).not.toHaveBeenCalled()
  })

  test('It should call the update webhook with the provided message', function() {
    console.info = jest.fn() // suppress console info message
    process.env.WEBHOOK = 'localhost'

    const message = 'hello world'
    const body = JSON.stringify({text: message})
    const options = {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    }
    updateWebhook(message)
    expect(fetch).toHaveBeenCalledWith('localhost', options)
  })
/*
  test('It should log the error when it occurs', function() {
    process.env.WEBHOOK = 'localhost'
    fetch.mockReturnValue(Promise.reject(new Error('mock error')))
    console.error = jest.fn()
    updateWebhook('hello world')
    expect(console.error).toHaveBeenCalled()
  })
  */
})
