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

var filename = join(common.tmpDir, 'append.txt')

common.error('appending to ' + filename)

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
fs.appendFile(filename, s, function (e) {
  if (e) throw e

  var ncallbacks = 1
  common.error('appended to file')

  fs.readFile(filename, function (e, buffer) {
    if (e) throw e
    common.error('file read')
    ncallbacks++
    assert.equal(Buffer.byteLength(s), buffer.length)
    fs.unlink(filename, function (err) {
      if (err) {
        assert.fail(err)
      }
      assert.equal(2, ncallbacks, 'test-fs-append-file-1')
      console.log('test-fs-append-file-1 success')
    })
  })
})
/*
// test that appends data to a non empty file
var filename2 = join(common.tmpDir, 'append2.txt')
fs.writeFile(filename, currentFileData, function (e) {
  fs.appendFile(filename, s, function (e) {
    if (e) throw e

    ncallbacks++
    common.error('appended to file2')

    fs.readFile(filename, function (e, buffer) {
      if (e) throw e
      common.error('file2 read')
      ncallbacks++
      assert.equal(Buffer.byteLength(s) + currentFileData.length, buffer.length)
    })
  })
})

// test that appendFile accepts buffers
var filename3 = join(common.tmpDir, 'append3.txt')
fs.writeFileSync(filename3, currentFileData)

var buf = new Buffer(s, 'utf8')
common.error('appending to ' + filename3)

fs.appendFile(filename3, buf, function (e) {
  if (e) throw e

  ncallbacks++
  common.error('appended to file3')

  fs.readFile(filename3, function (e, buffer) {
    if (e) throw e
    common.error('file3 read')
    ncallbacks++
    assert.equal(buf.length + currentFileData.length, buffer.length)
  })
})

// test that appendFile accepts numbers.
var filename4 = join(common.tmpDir, 'append4.txt')
fs.writeFileSync(filename4, currentFileData)

common.error('appending to ' + filename4)

var m = '0600'
fs.appendFile(filename4, n, { mode: m }, function (e) {
  if (e) throw e

  ncallbacks++
  common.error('appended to file4')

  // windows permissions aren't unix
  // if (process.platform !== 'win32') {
  //  var st = fs.statSync(filename4)
  //  assert.equal(st.mode & 0700, m)
  // }

  fs.readFile(filename4, function (e, buffer) {
    if (e) throw e
    common.error('file4 read')
    ncallbacks++
    assert.equal(Buffer.byteLength('' + n) + currentFileData.length,
                 buffer.length)
  })
})

process.on('exit', function () {
  common.error('done')
  assert.equal(8, ncallbacks)

  fs.unlinkSync(filename)
  fs.unlinkSync(filename2)
  fs.unlinkSync(filename3)
  fs.unlinkSync(filename4)
})
*/
