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
var fs = require('../../chrome')
var readdirDir = path.join(common.tmpDir, 'readdir')
var files = ['test.txt']
console.log('readdir ' + readdirDir)

fs.mkdir(readdirDir, function (err) {
  assert.equal(err, null)
  fs.writeFile(readdirDir + '/test.txt', '', function (err) {
    assert.equal(err, null)
    fs.readdir(readdirDir, function (err, f) {
      assert.equal(err, null)
      console.dir(f)
      assert.deepEqual(files, f)
      fs.unlink(readdirDir + '/test.txt', function (err) {
        assert.equal(err, null)
        fs.rmdir(readdirDir, function (err) {
          assert.equal(err, null)
          console.log('test-fs-readdir 1 success')
        })
      })
    })
  })
})

// readdir() on file should throw Error
// *nix error ENOENT not supported
// https://github.com/joyent/node/issues/1869
var readdirDir2 = path.join(common.tmpDir, 'readdir2')

fs.mkdir(readdirDir2, function (err) {
  assert.equal(err, null)
  fs.writeFile(readdirDir2 + '/test2.txt', '', function (err) {
    assert.equal(err, null)
    fs.readdir(readdirDir2 + '/test2.txt', function (err, f) {
      assert.ok(err, 'Expected error from file readdir')
      fs.unlink(readdirDir2 + '/test2.txt', function (err) {
        assert.equal(err, null)
        fs.rmdir(readdirDir2, function (err) {
          assert.equal(err, null)
          console.log('test-fs-readdir 2 success')
        })
      })
    })
  })
})
