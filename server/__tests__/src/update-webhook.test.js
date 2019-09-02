const updateWebhook = require('../../src/update-webhook')
const mockAxios = require('axios')

describe('updateWebhook', function() {
  afterEach(function() {
    jest.resetAllMocks()
  })
  
  test('It should not update webhook when no webhook url is set', function() {
    console.error = jest.fn()
    updateWebhook('testmessage')
    expect(console.error).toHaveBeenCalled()
    expect(mockAxios.post).not.toHaveBeenCalled()
  })

  test('It should not update webhook when webhook url is empty', function() {
    process.env.WEBHOOK = ''
    console.error = jest.fn()
    updateWebhook('testmessage')
    expect(console.error).toHaveBeenCalled()
    expect(mockAxios.post).not.toHaveBeenCalled()
  })

  test('It should call the update webhook with the provided message', function() {
    console.info = jest.fn() // suppress console info message
    process.env.WEBHOOK = 'https://fake.slack.url/'

    const message = 'hello world'
    const body = JSON.stringify({text: message})
    const options = {
      data: body,
      headers: { 'Content-Type': 'application/json' }
    }
    updateWebhook(message)
    expect(mockAxios.post).toHaveBeenCalledWith('https://fake.slack.url/', options)
  })

  test('It should not call the update when webhook is not a slack webhook', function() {
    console.info = jest.fn() // suppress console info message
    process.env.WEBHOOK = 'localhost'

    const message = 'hello world'
    updateWebhook(message)
    expect(mockAxios.post).not.toHaveBeenCalledWith()
  })

  test('It should log the error when it occurs', async() => {
    process.env.WEBHOOK = 'https://fake.slack.url/'
    mockAxios.post.mockReturnValue(Promise.reject(new Error('mock error')))
    console.error = jest.fn()
    await updateWebhook('hello world')
    expect(console.error).toHaveBeenCalled()
  })
})
