class Poller {
  constructor(func, pollTime) {
    this.func = func
    this.pollTime = pollTime
    this.timer = null
  }

  /**
   * Start polling
   */
  start() {
    this.func()
    this.timer = setInterval(this.func, this.pollTime)
  }

  /**
   * Stop polling
   */
  stop() {
    clearInterval(this.timer)
  }
}

module.exports = Poller
