const paramUtils = require('../../../src/services/param-utils')

paramUtils.checkParams
paramUtils.getAllParamCombinations
paramUtils.isDynamic

describe('paramUtils', function() {
  describe('checkParams', function() {
    test('Returns try when param has placeholder in url', function() {
      const url = 'http://localhost/{path}'
      const params = { path: [1, 2, 3]}
      expect(paramUtils.checkParams(url, params)).toEqual(true)
    })

    test('Throws when param has no placeholder in url', function() {
      const url = 'http://localhost/{path}'
      const params = { foo: [1, 2, 3]}
      expect(() => paramUtils.checkParams(url, params)).toThrow(/No placeholder/)
    })
  })

  describe('getAllParamCombinations', function() {
    test('Get combinations with single param property', function() {
      const service = { params: {
          foo: ['hello', 'world']
        } 
      }

      const expected = [{ foo: 'hello' }, { foo: 'world' }]
      const expectedLength = 2
      const combinations = paramUtils.getAllParamCombinations(service)
      expect(combinations.length).toEqual(expectedLength)
      expect(combinations).toEqual(expected)
    })

    test('Get combinations with multiple param properties', function() {
      const service = { params: {
          foo: ['hello', 'world'],
          bar: ['abc', 'def']
        } 
      }

      const expected = [
        { foo: 'hello', bar: 'abc' }, 
        { foo: 'hello', bar: 'def' },
        { foo: 'world', bar: 'abc' },
        { foo: 'world', bar: 'def' }
      ]
      const expectedLength = 4
      const combinations = paramUtils.getAllParamCombinations(service)
      expect(combinations.length).toEqual(expectedLength)
      expect(combinations).toEqual(expected)
    })

    test('Get combinations with multiple param properties with different lengths', function() {
      const service = { params: {
          foo: ['hello', 'world'],
          bar: ['abc', 'def', 'ghi', 'jkl']
        } 
      }

      const expected = [
        { foo: 'hello', bar: 'abc' }, 
        { foo: 'hello', bar: 'def' },
        { foo: 'hello', bar: 'ghi' }, 
        { foo: 'hello', bar: 'jkl' },
        { foo: 'world', bar: 'abc' },
        { foo: 'world', bar: 'def' },
        { foo: 'world', bar: 'ghi' },
        { foo: 'world', bar: 'jkl' }
      ]
      const expectedLength = 8
      const combinations = paramUtils.getAllParamCombinations(service)
      expect(combinations.length).toEqual(expectedLength)
      expect(combinations).toEqual(expected)
    })
  })

  describe('isDynamic', function() {
    test('Returns true when service has correct values', function() {
      const service = {
        url: '{path}',
        params: {
          path: [1]
        }
      }
      expect(paramUtils.isDynamic(service)).toEqual(true)
    })

    test('Returns false when service has no params', function() {
      const service = {
        url: '{path}'
      }
      expect(paramUtils.isDynamic(service)).toEqual(false)
    })

    test('Returns false when service doesn\'t have param placeholder in url', function() {
      const service = {
        url: '{host}',
        params: {
          path: [1]
        }
      }
      expect(() => paramUtils.isDynamic(service)).toThrow(/No placeholder/)
    })
  })
})
