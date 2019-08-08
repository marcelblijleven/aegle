const isEqual = require('../../src/is-equal')

describe('isEqual', function() {
  test('Should check string equality', function() {
    const a = 'lorem'
    const b = 'lorem'
    expect(isEqual(a, b,)).toEqual(true)
  })

  test('Should check number equality', function() {
    const a = 1337
    const b = 1337
    expect(isEqual(a, b)).toEqual(true)
  })

  test('Should check object equality', function() {
    const a = { status: 1337 }
    const b = { status: 1337 }
    expect(isEqual(a, b)).toEqual(true)
  })

  test('Should check object inequality', function() {
    const a = { status: 1337 }
    const b = { status: 1337, text: 'lorem' }
    expect(isEqual(a, b)).toEqual(false)
  })

  test('Should check boolean equality', function() {
    expect(isEqual(true, false)).toEqual(false)
  })
})
