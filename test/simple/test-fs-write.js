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
var path = require('path')
var Buffer = require('buffer').Buffer // eslint-disable-line
var fs = require('../../chrome')
var fn = path.join(common.tmpDir, 'write.txt')
var fn2 = path.join(common.tmpDir, 'write2.txt')
var expected = 'ümlaut.' // eslint-disable-line 
var constants = require('constants')

fs.open(fn, 'w', '0644', function (err, fd) {
  assert.equal(err, null)
  fs.write(fd, '', 0, 'utf8', function (err, written) {
    assert.equal(err, null)
    assert.equal(0, written)
  })
  fs.write(fd, expected, 0, 'utf8', function (err, written) {
    assert.equal(err, null)
    assert.equal(Buffer.byteLength(expected), written)
    fs.close(fd, function (err) {
      assert.equal(err, null)
      fs.readFile(fn, 'utf8', function (err, found) {
        assert.equal(err, null)
        assert.equal(expected, found, 'Umlaut test')
        fs.unlink(fn, function (err) {
          assert.equal(err, null)
          console.log('test-fs-write 1 success')
        })
      })
    })
  })
})

fs.open(fn2, constants.O_CREAT | constants.O_WRONLY | constants.O_TRUNC, '0644',
function (err, fd) {
  assert.equal(err, null)
  console.log('open done')
  fs.write(fd, '', 0, 'utf8', function (err, written) {
    assert.equal(err, null)
    assert.equal(0, written)
  })
  fs.write(fd, expected, 0, 'utf8', function (err, written) {
    assert.equal(err, null)
    assert.equal(Buffer.byteLength(expected), written)
    fs.close(fd, function (err) {
      assert.equal(err, null)
      fs.readFile(fn2, 'utf8', function (err, found) {
        assert.equal(err, null)
        assert.equal(expected, found, 'Umlaut test')
        fs.unlink(fn2, function (err) {
          assert.equal(err, null)
          console.log('test-fs-write 2 success')
        })
      })
    })
  })
})
