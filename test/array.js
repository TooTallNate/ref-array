
var assert = require('assert')
  , ref = require('ref')
  , ArrayType = require('../')
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'native_tests' })

describe('Array', function () {

  afterEach(gc)

  it('should be a function', function () {
    assert.equal('function', typeof ArrayType)
  })

  describe('char[]', function () {

    it('should map directly to a "string"', function () {
      var CharArray = ArrayType('char')
      var b = new Buffer('hello', 'ascii')
      var a = new CharArray(b)
      assert.equal(b.length, a.length)
      for (var i = 0; i < b.length; i++) {
        assert.equal(a[i], b[i])
      }
    })

  })

  describe('int32[]', function () {

    it('should act like an Int32Array with a number', function () {
      var Int32Array = ArrayType('int32')
      assert.equal(0, Int32Array.size)

      var a = new Int32Array(5)
      assert.equal(5, a.length)
      assert.equal(20, a.buffer.length)
      a[0] = 0
      a[1] = 10
      a[2] = 234
      a[3] = 69
      a[4] = 1410214
      assert.deepEqual([0, 10, 234, 69, 1410214], a.toArray())
    })

    it('should act like an Int32Array with an array', function () {
      var Int32Array = ArrayType('int32')

      var input = [ 1, 4, 91, 123123, 5123512, 0, -1 ]
      var a = new Int32Array(input)
      assert.equal(input.length, a.length)
      assert.deepEqual(input, a.toArray())
    })

  })

  describe('void *[]', function () {

    it('should have each element be "pointer" sized', function () {
      var VoidPtrArray = ArrayType('void *')
      assert.equal(ref.sizeof.pointer, VoidPtrArray.BYTES_PER_ELEMENT)
    })

    it('should accept arbitrary pointers', function () {
      var VoidPtrArray = ArrayType('void *')

      var a = new VoidPtrArray(5)
      assert.equal(5, a.length)
      assert.equal(a.length * ref.sizeof.pointer, a.buffer.length)
      var ptr1 = Buffer(1)
      var ptr2 = Buffer(1)
      var ptr3 = Buffer(1)
      a[0] = ref.NULL
      a[1] = ref.NULL_POINTER
      a[2] = ptr1
      a[3] = ptr2
      a[4] = ptr3

      assert.equal(a[0].address(), ref.NULL.address())
      assert.equal(a[1].address(), ref.NULL_POINTER.address())
      assert.equal(a[2].address(), ptr1.address())
      assert.equal(a[3].address(), ptr2.address())
      assert.equal(a[4].address(), ptr3.address())
    })

  })

  describe('fixed size arrays', function () {

    it('should be created when invoked with no arguments', function () {
      var int = ref.types.int
      var IntArrayTen = ArrayType(int, 10)
      assert.equal(int.size * 10, IntArrayTen.size)

      var array = new IntArrayTen()
      assert.equal(10, array.length)
    })

  })

  describe('.untilZeros(buffer)', function () {

    it('should read a Buffer until a NULL pointer is found', function () {
      var int = ref.types.int
      var IntArray = ArrayType(int)

      // manually create a NULL-terminated int[]
      var buf = new Buffer(int.size * 3)
      int.set(buf, int.size * 0, 5)
      int.set(buf, int.size * 1, 8)
      int.set(buf, int.size * 2, 0) // <- terminate with 0s

      var array = IntArray.untilZeros(buf)
      assert.equal(2, array.length)
      assert.equal(5, array[0])
      assert.equal(8, array[1])
    })

  })

})
