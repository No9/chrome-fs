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

var filename = join(common.tmpDir, 'test.txt')

common.error('writing to ' + filename)

var n = 220
var s = 'asdpfkasdlfjsd;kljfklsdjfklasjdfklasdjfasdkljf' +
        'asdpfkasdlfjsd;kljfklsdjfklasjdfklasdjfasdkljf' +
        'sdfgs34234234asdfasdfasdfasdfasdfasfasdfsdfasdf' +
        'asdpfkasdlfjsd;kljfklsdjfklasjdfklasdjfasdkljf' +
        'asdpfkasdlfjsd;kljfklsdjfklasjdfklasdjfasdkljf' +
        'sdfgs34234234asdfasdfasdfasdfasdfasfasdfsdfasdf' +
        'end123end123\n'

fs.writeFile(filename, s, function (e) {
  if (e) {
    console.log(e)
    throw e
  }
  var ncallbacks1 = 1
  common.error('file written')

  fs.readFile(filename, function (e, buffer) {
    if (e) throw e
    common.error('file read')
    ncallbacks1++
    assert.equal(Buffer.byteLength(s), buffer.length)
    fs.unlink(filename, function (err) {
      if (err) {
        assert.fail(err)
      }
      assert.equal(2, ncallbacks1, 'test-fs-write-file-1')
      console.log('test-fs-write-file-1 success')
    })
  })
})

// test that writeFile accepts buffers
var filename2 = join(common.tmpDir, 'test2.txt')
var buf = new Buffer(s, 'utf8')
common.error('writing to ' + filename2)

fs.writeFile(filename2, buf, function (e) {
  if (e) {
    console.log(e)
    throw e
  }

  var ncallbacks2 = 1
  common.error('file2 written')

  fs.readFile(filename2, function (e, buffer) {
    if (e) {
      console.log(e)
      console.log('file2 READERROR')
      throw e
    }
    common.error('file2 read')
    ncallbacks2++
    assert.equal(buf.length, buffer.length)
    fs.unlink(filename2, function (err) {
      if (err) {
        assert.fail(err)
      }
      assert.equal(2, ncallbacks2, 'test-fs-write-file-2')
      console.log('test-fs-write-file-2 success')
    })
  })
})

// test that writeFile accepts numbers.
var filename3 = join(common.tmpDir, 'test3.txt')
common.error('writing to ' + filename3)

var m = '0600'
fs.writeFile(filename3, n, { mode: m }, function (e) {
  if (e) {
    console.log(e)
    throw e
  }

  // windows permissions aren't unix
  /* if (process.platform !== 'win32') {
    var st = fs.statSync(filename3)
    assert.equal(st.mode & 0700, m)
  }*/

  var ncallbacks3 = 1
  common.error('file3 written')

  fs.readFile(filename3, function (e, buffer) {
    if (e) {
      console.log(e)
      console.log('file3 READERROR')
      throw e
    }
    common.error('file3 read')
    ncallbacks3++
    assert.equal(Buffer.byteLength('' + n), buffer.length)
    fs.unlink(filename3, function (err) {
      if (err) {
        assert.fail(err)
      }
      assert.equal(2, ncallbacks3, 'test-fs-write-file-3')
      console.log('test-fs-write-file-3 success')
    })
  })
})
