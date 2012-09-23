
/**
 * Module dependencies.
 */

var _ref = require('ref')
var assert = require('assert')
var debug = require('debug')('ref:array')
var ArrayIndex = require('array-index')
var isArray = Array.isArray

/**
 * The Array "type" constructor.
 * The returned constructor's API is highly influenced by the WebGL
 * TypedArray API.
 */

module.exports = function Array (_type, _length) {
  debug('defining new array "type"')
  var type = _ref.coerceType(_type)
  var fixedLength = _length | 0

  /**
   * This is the ArrayType "constructor" that gets returned.
   */

  function ArrayType (data, length) {
    if (!(this instanceof ArrayType)) {
      return new ArrayType(data, length)
    }
    debug('creating new array instance')
    ArrayIndex.call(this)
    var item_size = ArrayType.BYTES_PER_ELEMENT
    if (0 === arguments.length) {
      // new IntArray()
      // use the "fixedLength" if provided, otherwise throw an Error
      if (fixedLength > 0) {
        this.length = fixedLength
        this.buffer = new Buffer(this.length * item_size)
      } else {
        throw new Error('A "length", "array" or "buffer" must be passed as the first argument')
      }
    } else if ('number' == typeof data) {
      // new IntArray(69)
      this.length = data
      this.buffer = new Buffer(this.length * item_size)
    } else if (isArray(data)) {
      // new IntArray([ 1, 2, 3, 4, 5 ], {len})
      // use optional "length" if provided, otherwise use "fixedLength, otherwise
      // use the Array's .length
      var len = 0
      if (null != length) {
        len = length
      } else if (fixedLength > 0) {
        len = fixedLength
      } else {
        len = data.length
      }
      if (data.length < len) {
        throw new Error('array length must be at least ' + len + ', got ' + data.length)
      }
      this.length = len
      this.buffer = new Buffer(len * item_size)
      for (var i = 0; i < len; i++) {
        this[i] = data[i]
      }
    } else if (Buffer.isBuffer(data)) {
      // new IntArray(Buffer(8))
      var len = 0
      if (null != length) {
        len = length
      } else if (fixedLength > 0) {
        len = fixedLength
      } else {
        len = data.length / item_size | 0
      }
      var expectedLength = item_size * len
      this.length = len
      if (data.length != expectedLength) {
        if (data.length < expectedLength) {
          throw new Error('buffer length must be at least ' + expectedLength + ', got ' + data.length)
        } else {
          debug('resizing buffer from %d to %d', data.length, expectedLength)
          data = data.slice(0, expectedLength)
        }
      }
      this.buffer = data
    }
  }

  // make array instances inherit from our `ArrayIndex.prototype`
  ArrayType.prototype = Object.create(ArrayIndex.prototype, {
    constructor: {
      value: ArrayType,
      enumerable: false,
      writable: true,
      configurable: true
    },
    // "buffer" is the backing buffer instance
    buffer: {
      value: _ref.NULL,
      enumerable: true,
      writable: true,
      configurable: true
    },
    // part of the "array-index" interface
    __get__: {
      value: getter,
      enumerable: true,
      writable: true,
      configurable: true
    },
    // part of the "array-index" interface
    __set__: {
      value: setter,
      enumerable: true,
      writable: true,
      configurable: true
    },
    // "node-ffi" calls this when passed an array instance to an ffi'd function
    ref: {
      value: ref,
      enumerable: true,
      writable: true,
      configurable: true
    }
  })

  // save down the "fixedLength" if specified. "ref-struct" needs this value
  if (fixedLength > 0) {
    ArrayType.fixedLength = fixedLength
  }

  // keep a reference to the base "type"
  ArrayType.type = type
  ArrayType.BYTES_PER_ELEMENT = type.indirection == 1 ? type.size : _ref.sizeof.pointer
  assert(ArrayType.BYTES_PER_ELEMENT > 0)

  // the ref "type" interface
  ArrayType.size = ArrayType.BYTES_PER_ELEMENT * fixedLength
  ArrayType.alignment = type.alignment
  ArrayType.indirection = 1
  ArrayType.get = get
  ArrayType.set = set

  // untilZeros() function
  ArrayType.untilZeros = untilZeros

  return ArrayType
}

/**
 * The "get" function of the Array "type" interface.
 */

function get (buffer, offset) {
  debug('Array "type" getter for buffer at offset', offset)
  if (offset > 0) {
    buffer = buffer.slice(offset)
  }
  return new this(buffer)
}

/**
 * The "set" function of the Array "type" interface.
 */

function set (buffer, offset, value) {
  debug('Array "type" setter for buffer at offset', buffer, offset, value)
  if (offset > 0) {
    buffer = buffer.slice(offset)
  }
  var array = new this(buffer)
  var isArray = value instanceof this
  assert(0, 'implement!!!')
}

/**
 * Returns the backing buffer of the Array instance.
 */

function ref () {
  return this.buffer
}

/**
 * The "getter" implementation for the "array-index" interface.
 */

function getter (index) {
  var size = this.constructor.BYTES_PER_ELEMENT
  var baseType = this.constructor.type
  return _ref.get(this.buffer, size * index, baseType)
}

/**
 * The "setter" implementation for  the "array-index" interface.
 */

function setter (index, value) {
  var size = this.constructor.BYTES_PER_ELEMENT
  var type = this.constructor.type
  _ref.set(this.buffer, size * index, value, type)
  return value
}

/**
 * Accepts a Buffer instance that should be an already-populated with data for the
 * ArrayType. The "length" of the Array is determined by searching through the
 * buffer's contents until an aligned NULL pointer is encountered.
 *
 * @param {Buffer} buffer the null-terminated buffer to convert into an Array
 * @api public
 */

function untilZeros (buffer) {
  return new this(_ref.reinterpretUntilZeros(buffer, this.type.size));
}
