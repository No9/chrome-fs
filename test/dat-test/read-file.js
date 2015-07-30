var test = require('tape').test
var fs = require('../../chrome')

test('readFile', function (t) {
  fs.writeFile('/test.txt', 'hello', function (err) {
    t.ok(!err, 'readFile /foo')
    fs.readFile('/test.txt', function (err, data) {
      t.notOk(err)
      t.ok(Buffer.isBuffer(data), 'Data is buffer')
      t.same(data.toString(), 'hello')
      fs.unlink('/test.txt', function (err) {
        t.ok(!err, 'unlinked /test.txt')
        t.end()
      })
    })
  })
})

test('cannot readFile dir', function (t) {
  fs.mkdir('/test', function () {
    fs.readFile('/test', function (err) {
      t.ok(err)
      t.same(err.code, 'EISDIR')
      fs.rmdir('/test', function (err) {
        t.notOk(err)
        t.end()
      })
    })
  })
})

test('readFile + encoding', function (t) {
  fs.writeFile('/foo.txt', 'hello', function (err) {
    t.ok(!err, 'Created File /foo')
    fs.readFile('/foo.txt', 'hex', function (err, data) {
      t.notOk(err, 'Error in hex')
      t.same(data, '68656c6c6f', 'hex is equal')
      fs.unlink('/foo.txt', function (err) {
        t.ok(!err, 'unlinked /test.txt')
        t.end()
      })
    })
  })
})
