const Store = require('../../src/store')

describe('Store', function() {
  test('Creating a store returns instance with empty values', function() {
    const store = new Store()
    expect(store.values).toEqual({})
  })

  test('Adding values to the store with set', function() {
    const store = new Store()
    store.set('foo', 'bar')
    expect(store.values).toEqual({foo: 'bar'})
  })

  test('Retrieving values from the store with get', function() {
    const store = new Store()
    store.set('foo', 'bar')
    const value = store.get('foo')
    expect(value).toEqual('bar')
  })

  test('Retrieving values from the store using exisiting key with get', function() {
    const store = new Store()
    store.set('foo', 'bar')
    const value = store.get('baz')
    expect(value).toEqual(null)
  })

  test('Removing values from the store with remove', function() {
    const store = new Store()
    store.set('foo', 'bar')
    store.set('hello', 'world')
    store.remove('foo')
    expect(store.values).toEqual({hello: 'world'})
  })

  test('Clearing the store with clearAll', function() {
    const store = new Store()
    store.set('foo', 'bar')
    store.set('hello', 'world')
    store.clearAll()
    expect(store.values).toEqual({})
  })

  test('Creating a JSON string', function() {
    const store = new Store()
    store.set('foo', 'bar')
    store.set('hello', 'world')
    const json = store.json()
    expect(json).toEqual('{"foo":"bar","hello":"world"}')
  })

  test('Load values from JSON string', function() {
    const store = new Store()
    const values = '{"foo":"bar","hello":"world"}'
    store.loadFromJson(values)
    expect(store.values).toEqual({foo:'bar', hello:'world'})
  })

  test('Load values from incorrect JSON string', function() {
    const store = new Store()
    store.set('hello', 'world')
    const values = 'foo:bar'
    store.loadFromJson(values)
    expect(store.values).toEqual({hello:'world'})
  })
})
