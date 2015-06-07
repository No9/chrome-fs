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
var join = require('path').join

var appfilename = join(common.tmpDir, 'append.txt')

common.error('appending to ' + appfilename)

var currentFileData = 'ABCD' // eslint-disable-line

var n = 220 // eslint-disable-line
var s = 'asdpfkasdlfjsdkljfklsdjfklasjdfklasdjfasdkljf' +
        'asdpfkasdlfjsdkljfklsdjfklasjdfklasdjfasdkljf' +
        'sdfgs34234234asdfasdfasdfasdfasdfasfasdfsdfasdf' +
        'asdpfkasdlfjsdkljfklsdjfklasjdfklasdjfasdkljf' +
        'asdpfkasdlfjsdkljfklsdjfklasjdfklasdjfasdkljf' +
        'sdfgs34234234asdfasdfasdfasdfasdfasfasdfsdfasdf' +
        'end123end123\n'

// test that empty file will be created and have content added
fs.appendFile(appfilename, currentFileData, function (e) {
  console.log(e)
  if (e) throw e

  var ncallbacks = 1
  common.error('appended to file')

  fs.readFile(appfilename, function (e, buffer) {
    console.log('readFile 1' + e)
    if (e) throw e
    common.error('file read')
    ncallbacks++
    assert.equal(Buffer.byteLength(currentFileData), buffer.length)
    assert.equal(2, ncallbacks, 'test-fs-append-file-1')
    console.log('test-fs-append-file 1 success')
    // test that appends data to a non empty file
    fs.appendFile(appfilename, s, function (e) {
      console.log('appendFile 2')
      console.log(e)
      if (e) throw e

      var ncallbacks2 = 1
      common.error('appended to file2')

      fs.readFile(appfilename, function (e, buffer) {
        if (e) throw e
        common.error('file2 read')
        ncallbacks2++
        assert.equal(Buffer.byteLength(s) + currentFileData.length, buffer.length)
        fs.unlink(appfilename, function (err) {
          if (err) {
            assert.fail(err)
          }
          assert.equal(2, ncallbacks2, 'test-fs-append-file-2')
          console.log('test-fs-append-file 2 success')
        })
      })
    })
  })
})

// test that appendFile accepts buffers
var filename3 = join(common.tmpDir, 'append3.txt')
fs.writeFile(filename3, currentFileData, function (e) {
  var buf = new Buffer(s, 'utf8')
  common.error('appending to ' + filename3)

  fs.appendFile(filename3, buf, function (e) {
    console.log(e)
    if (e) throw e

    var ncallbacks3 = 1
    common.error('appended to file3')

    fs.readFile(filename3, function (e, buffer) {
      if (e) throw e
      common.error('file3 read')
      ncallbacks3++
      assert.equal(buf.length + currentFileData.length, buffer.length)
      fs.unlink(filename3, function (err) {
        if (err) {
          assert.fail(err)
        }
        assert.equal(2, ncallbacks3, 'test-fs-append-file-3')
        console.log('test-fs-append-file-3 success')
      })
    })
  })
})
