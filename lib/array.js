
var ref = require('ref')
var assert = require('assert')
var debug = require('debug')('ref:array')

/**
 * The Array "type" constructor.
 */

module.exports = function Array (type) {
  debug('defining new array "type"')

  var constructor = function (arg, data) {

  }

  // make array instances inherit from our `proto`
  constructor.prototype = Object.create(proto)
  constructor.prototype.constructor = constructor

  // the ref "type" interface
  constructor.size = type.size // WTF do we do here?
  constructor.alignment = type.alignment
  constructor.indirection = 2
  constructor.get = get
  constructor.set = set

  // keep a reference to the original "type"
  constructor.type = type

  return constructor
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

var proto = {}

// set a placeholder pointer variable
proto._pointer = ref.NULL

proto.ref = function ref () {
  return this._pointer
}
