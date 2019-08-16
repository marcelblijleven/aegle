class Store {
  constructor() {
    this.values = {}
  }

  init(services) {
    for (const service of services) {
      this.set(service.name, 'pending')
    }
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
    return this.values
  }
}

const store = new Store()

function initialiseStore(services) {
  store.init(services)
}

function updateStore(key, value) {
  store.set(key, value)
}

module.exports = {
  store,
  initialiseStore,
  updateStore
}
