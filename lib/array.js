
/**
 * Module dependencies.
 */

var _ref = require('ref')
var assert = require('assert')
var debug = require('debug')('ref:array')
var ArrayIndex = require('array-index')

/**
 * The Array "type" constructor.
 */

module.exports = function Array (_type, _length) {
  debug('defining new array "type"')
  var type = _ref.coerceType(_type)

  /**
   * This is the ArrayType "constructor" that gets returned.
   */

  function ArrayType (data) {
    if (!(this instanceof ArrayType)) {
      return new ArrayType(_length)
    }
    debug('creating new array instance');
    ArrayIndex.call(this)
    if ('number' == typeof data) {
      this.length = data
      this.buffer = new Buffer(this.length * type.size)
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
    __get__: {
      value: getter,
      enumerable: true,
      writable: true,
      configurable: true
    },
    __set__: {
      value: setter,
      enumerable: true,
      writable: true,
      configurable: true
    }
  })

  // the ref "type" interface
  ArrayType.size = type.size * (_length | 0)
  ArrayType.alignment = type.alignment
  ArrayType.indirection = 1
  ArrayType.get = get
  ArrayType.set = set

  // keep a reference to the original "type"
  ArrayType.type = type

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
  var type = this.constructor.type
  return _ref.get(this.buffer, type.size * index, type)
}

/**
 * The "setter" implementation for  the "array-index" interface.
 */

function setter (index, value) {
  var type = this.constructor.type
  _ref.set(this.buffer, type.size * index, value, type)
  return value
}
