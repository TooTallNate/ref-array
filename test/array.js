
var assert = require('assert')
  , ref = require('ref')
  , ArrayType = require('../')
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'native_tests' })

describe('Array', function () {

  afterEach(gc)

  it('should be a function', function () {
    assert.equal('function', typeof ArrayType)
  })

  describe('int32', function () {

    it('should act like an Int32Array', function () {
      var Int32ArrayType = ArrayType('int32')
      var a = new Int32ArrayType(5)
      a[0] = 0
      a[1] = 1
      a[2] = 2
      a[3] = 3


    })

  })

})
