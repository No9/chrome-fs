// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var common = require('../common')
var assert = require('assert')
var fs = require('../../chrome')

var pathname = common.tmpDir + 'test1'
var ncalls = 0
var ncalls2 = 0

fs.mkdir(pathname, function (err) {
  assert.equal(err, null)
  ncalls++
  fs.mkdir(pathname, function (err) {
    assert.equal(err.code, 'EEXIST')
    ncalls++
    assert.equal(ncalls, 2)
    fs.rmdir(pathname, function () {
      console.log('test-fs-mkdir 1 success')
    })
  })
})

// Test for mod creation
var pathname2 = common.tmpDir + '/test2'

fs.mkdir(pathname2, 511, function (err) {
  assert.equal(err, null)
  ncalls2++
  fs.exists(pathname2, function (exists) {
    ncalls2++
    fs.rmdir(pathname2, function () {
      assert(ncalls2, 2)
      console.log('test-fs-mkdir 2 success')
    })
  })
})
