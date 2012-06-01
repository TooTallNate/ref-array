
var assert = require('assert')
  , ref = require('ref')
  , ArrayType = require('../')
  , bindings = require('./build/Release/native_tests')

describe('Array', function () {

  afterEach(gc)

  it('should be a function', function () {
    assert.equal('function', typeof ArrayType)
  })

})
