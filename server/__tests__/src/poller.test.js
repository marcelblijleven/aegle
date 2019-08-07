const Poller = require('../../src/poller')

describe('poller', function() {
  test('Starting the poller should start polling the provided function', function() {
    jest.useFakeTimers()
    const func = jest.fn()
    const poller = new Poller(func, 500)
    poller.start()
    jest.advanceTimersByTime(600);
    expect(func).toBeCalled()
    jest.useRealTimers()
  })

  test('Stopping the poller should stop polling the provided function', function() {
    jest.useFakeTimers()
    const func = jest.fn()
    const poller = new Poller(func, 500)
    poller.start()
    jest.advanceTimersByTime(600)
    poller.stop()
    jest.advanceTimersByTime(600)
    expect(func).toBeCalledTimes(1)
    jest.useRealTimers()
  })
})