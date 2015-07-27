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

var assert = require('assert')
var fs = require('../../chrome')
var got_error = false
var success_count = 0
var dirlocation = '/'
fs.stat(dirlocation, function (err, stats) {
  if (err) {
    got_error = true
    console.log(err)
  } else {
    console.dir(stats)
    assert.ok(stats.mtime instanceof Date)
    success_count++
  }
  assert(this === global)
})

fs.stat(dirlocation, function (err, stats) {
  if (err) {
    got_error = true
  }
  assert.ok(stats.hasOwnProperty('blksize'))
  assert.ok(stats.hasOwnProperty('blocks'))
})
/* fs.lstat('.', function (err, stats) {
  if (err) {
    got_error = true
  } else {
    console.dir(stats)
    assert.ok(stats.mtime instanceof Date)
    success_count++
  }
  assert(this === global)
})
*/
// fstat
fs.open(dirlocation, 'r', undefined, function (err, fd) {
  console.log(err)
  assert.ok(!err, 'Error on fs open ')

  assert.ok(fd, 'fd is an object')
  fs.fstat(fd, function (err, stats) {
    if (err) {
      got_error = true
      console.log(err)
    } else {
      console.dir(stats)
      assert.ok(stats.mtime instanceof Date)
      success_count++
      fs.close(fd)
    }
    assert(this === global)
  })

  assert(this === global)
})

var filelocation = '/test-fs-stat.txt'
fs.writeFile(filelocation, 'Some lorum impsum', function () {
  assert.ok(true, 'Write with string and callback')
  fs.stat(filelocation, function (err, s) {
    if (err) {
      got_error = true
      console.log(err)
    } else {
      console.dir(s)
      success_count++

      console.log('isDirectory: ' + JSON.stringify(s.isDirectory()))
      assert.equal(false, s.isDirectory())

      console.log('isFile: ' + JSON.stringify(s.isFile()))
      assert.equal(true, s.isFile())

      console.log('isSocket: ' + JSON.stringify(s.isSocket()))
      assert.equal(false, s.isSocket())

      console.log('isBlockDevice: ' + JSON.stringify(s.isBlockDevice()))
      assert.equal(false, s.isBlockDevice())

      console.log('isCharacterDevice: ' + JSON.stringify(s.isCharacterDevice()))
      assert.equal(false, s.isCharacterDevice())

      console.log('isFIFO: ' + JSON.stringify(s.isFIFO()))
      assert.equal(false, s.isFIFO())

      console.log('isSymbolicLink: ' + JSON.stringify(s.isSymbolicLink()))
      assert.equal(false, s.isSymbolicLink())

      assert.ok(s.mtime instanceof Date)
    }
    fs.unlink(filelocation, function (err) {
      if (err) {
        assert.fail(err)
      }
      assert.equal(3, success_count)
      assert.equal(false, got_error)
      assert.ok(true, 'delete and callback')
      console.log('test-fs-stat success')
    })
  })
})
