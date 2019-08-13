class Store {
  constructor() {
    this.values = {}
  }

  get(key) {
    if (this.values.hasOwnProperty(key)) {
      return this.values[key]
    }
    
    return null
  }

  set(key, value) {
    this.values[key] = value
  }

  remove(key) {
    delete this.values[key]
  }

  clearAll() {
    this.values = {}
  }

  json() {
    return JSON.stringify(this.values)
  }

  loadFromJson(str) {
    try {
      this.values = JSON.parse(str)
    }
    catch (error) {
      this.values = this.values
    }
    finally {
      return this.values
    }
  }
}

module.exports = Store
