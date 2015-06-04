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

var fs = require('../../chrome')
var assert = require('assert')
var path = require('path')

var common = require('../common')

var file = path.join(common.tmpDir, 'read_stream_fd_test.txt')
var input = 'hello world'
var output = ''
var stream

fs.writeFile(file, input, function (e) {
  if (e) {
    console.log(e)
    throw e
  }
  fs.open(file, 'r', function (err, fd) {
    if (err) {
      assert.fail(err)
    }
    stream = fs.createReadStream(null, { fd: fd, encoding: 'utf8' })
    stream.on('data', function (data) {
      output += data
    }).on('close', function () {
      fs.unlink(file, function (err) {
        if (err) {
          assert.fail(err)
        }
        console.log('read_stream_fd_test success')
      })
      assert.equal(output, input)

    })
  })
})
