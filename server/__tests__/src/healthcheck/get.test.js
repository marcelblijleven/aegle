jest.mock('node-fetch')
const fetch = require('node-fetch')
const { Headers, Response } = jest.requireActual('node-fetch')
const { advanceTo, clear } = require('jest-date-mock')

const get = require('../../../src/healthcheck/get')
const { createResponseObject, createError } = require('../../../src/healthcheck/utils')

const jsonHeaders = new Headers({ 'Content-Type' : 'application/json' })
const htmlHeaders = new Headers({ 'Content-Type' : 'text/html' })
const textHeaders = new Headers({ 'Content-Type' : 'text/plain' })

describe('get', function() {
  beforeAll(function() {
    advanceTo(new Date(2019, 9, 2, 0, 0, 0, 0))
  })

  afterAll(function() {
    clear()
  })

  afterEach(function() {
    jest.resetAllMocks()
  })

  test('Throw error if response status is not ok', async () => {
    // Setup fetch response inside 'get'
    const fetchMockResponse = new Response('body', { status: 500 })
    fetch.mockReturnValue(Promise.resolve(fetchMockResponse))
    await expect(get('http://localhost')).rejects.toThrow(/Response status/)
  })

  describe('json', function() { 
    test('Response with valid json body', async () => {
      // Setup fetch response inside 'get'
      const body = JSON.stringify({ hello: 'world' })
      const fetchMockResponse = new Response(body, { status: 200, headers: jsonHeaders })
      fetch.mockReturnValue(Promise.resolve(fetchMockResponse))
      const value = await get('http://localhost')
      expect(value).toEqual(createResponseObject(fetchMockResponse, { hello: 'world' }, new Date()))
    })

    test('Response with invalid json body', async () => {
      // Setup fetch response inside 'get'
      const fetchMockResponse = new Response('body', { status: 200, headers: jsonHeaders })
      fetch.mockReturnValue(Promise.resolve(fetchMockResponse))
      await expect(get('http://localhost')).rejects.toThrow(/Unexpected token/)
    })
  })

  describe('html', function() {
    test('Response with valid html body', async () => {
      // Setup fetch response inside 'get'
      const body = '<html><head><title>Hello World</title></head><body>Hello</body></html>'
      const fetchMockResponse = new Response(body, { status: 200, headers: htmlHeaders })
      fetch.mockReturnValue(Promise.resolve(fetchMockResponse))
      const value = await get('http://localhost')
      expect(value).toEqual(createResponseObject(fetchMockResponse, body, new Date()))
    })

    test('Response with invalid html body', async () => {
      // Setup fetch response inside 'get'
      const fetchMockResponse = new Response('body', { status: 200, headers: htmlHeaders })
      fetchMockResponse.text = function() {
        throw new Error('Html error')
      }
      fetch.mockReturnValue(Promise.resolve(fetchMockResponse))
      await expect(get('http://localhost')).rejects.toThrow()
    })
  })

  describe('text', function() {
    test('Response with valid text body', async () => {
      // Setup fetch response inside 'get'
      const body = 'Hello world'
      const fetchMockResponse = new Response(body, { status: 200, headers: htmlHeaders })
      fetch.mockReturnValue(Promise.resolve(fetchMockResponse))
      const value = await get('http://localhost')
      expect(value).toEqual(createResponseObject(fetchMockResponse, body, new Date()))
    })

    test('Response with invalid text body', async () => {
      // Setup fetch response inside 'get'
      const fetchMockResponse = new Response('body', { status: 200, headers: htmlHeaders })
      fetchMockResponse.text = function() {
        throw new Error('Text error')
      }
      fetch.mockReturnValue(Promise.resolve(fetchMockResponse))
      await expect(get('http://localhost')).rejects.toThrow(/Text error/)
    })
  })
})
