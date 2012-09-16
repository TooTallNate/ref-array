
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
      assert.equal(0, Int32ArrayType.size)

      var a = new Int32ArrayType(5)
      assert.equal(5, a.length)
      assert.equal(20, a.buffer.length)
      a[0] = 0
      a[1] = 10
      a[2] = 234
      a[3] = 69
      a[4] = 1410214
      assert.deepEqual([0, 10, 234, 69, 1410214], a.toArray())
    })

  })

})
