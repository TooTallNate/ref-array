
var assert = require('assert')
  , ref = require('ref')
  , ArrayType = require('../')
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'native_tests' })

describe('Array', function () {

  afterEach(gc)

  it('should be a function', function () {
    assert.equal('function', typeof ArrayType)
  })

})
