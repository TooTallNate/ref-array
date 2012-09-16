
/**
 * Module dependencies.
 */

var ref = require('ref')
var assert = require('assert')
var debug = require('debug')('ref:array')
var ArrayIndex = require('array-index')

/**
 * The Array "type" constructor.
 */

module.exports = function Array (_type, _length) {
  debug('defining new array "type"')
  var type = ref.coerceType(_type)

  /**
   * This is the ArrayType "constructor" that gets returned.
   */

  function ArrayType (_length) {
    if (!(this instanceof ArrayType)) {
      return new ArrayType(_length)
    }
    debug('creating new array instance');
    ArrayIndex.call(this)
  }

  // make array instances inherit from our `proto`
  ArrayType.prototype = Object.create(proto, {
    constructor: {
      value: ArrayType,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })

  // the ref "type" interface
  ArrayType.size = 0 // WTF do we do here?
  ArrayType.alignment = type.alignment
  ArrayType.indirection = 1
  ArrayType.get = get
  ArrayType.set = set

  // keep a reference to the original "type"
  ArrayType.type = type

  return ArrayType
}

/**
 * The "get" function of the Array "type" interface
 */

function get (buffer, offset) {
  debug('Array "type" getter for buffer at offset', offset)
  if (offset > 0) {
    buffer = buffer.slice(offset)
  }
  return new this(buffer)
}

/**
 * The "set" function of the Array "type" interface
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
 * This is the custom prototype of Array type instances.
 */

var proto = Object.create(ArrayIndex.prototype)

// set a placeholder pointer variable
proto.buffer = ref.NULL

proto.ref = function ref () {
  return this.buffer
}
