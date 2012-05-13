ref-array
=========
### Create C "array" instances on top of Buffers
[![Build Status](https://secure.travis-ci.org/TooTallNate/ref-struct.png)](http://travis-ci.org/TooTallNate/ref-stuct)


This module offers an "array" implementation on top of Node.js Buffers using
the ref "type" interface.

Installation
------------

Install with `npm`:

``` bash
$ npm install ref-array
```


Examples
--------

#### Basic usage

``` js
var ref = require('ref')
var ArrayType = require('ref-array')

// typedef
var int = ref.types.int

// define the "int[]" type
var IntArray = ArrayType(int)

// now we can create array instances
var a = new IntArray(5)
a[0] = 0
a[1] = 1
a[2] = -1
a[3] = 2
a[4] = -2
```

#### With `node-ffi`

``` js
var ffi = require('node-ffi')

// the "int[]" type may be used as a "type" in FFI'd functions or callbacks
var func = ffi.ForeignFunction(funcPointer, int, [ IntArray, int ])

var arg = new IntArray(3)
arg[0] = 1234
arg[1] = -9999
arg[2] = 1

var rtn = func(arg, arg.length)
```


License
-------

(The MIT License)

Copyright (c) 2012 Nathan Rajlich &lt;nathan@tootallnate.net&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
