var test = require('tape').test
var fs = require('../../chrome')
var through = require('through2')

test('createReadStream', function (t) {
  fs.writeFile('/test1.txt', 'hello', function (err) {
    t.ok(!err, 'Write file error')
    var rs = fs.createReadStream('/test1.txt')
    rs.pipe(through(function (chunk, enc, callback) {
      t.same(chunk, new Buffer('hello'), '/test1.txt contians hello')
      fs.unlink('/test1.txt', function (err) {
        t.ok(!err, 'unlinked /test1.txt')
        t.end()
        callback()
      })
    }))
  })
})

test('createReadStream big file', function (t) {
  var big = new Buffer(100 * 1024)

  fs.writeFile('/test2.txt', big, function (err) {
    t.ok(!err)
    var rs = fs.createReadStream('/test2.txt')
    // We can use through because the file API doesn't stream
    // so all the data is in through chunck
    // This will break when seeking is implemented
    rs.pipe(through(function (chunk, enc, callback) {
      t.same(chunk, big)
      fs.unlink('/test2.txt', function (err) {
        t.ok(!err, 'unlinked /test2.txt')
        t.end()
        callback()
      })
    }))
  })
})

test('createReadStream random access', function (t) {
  fs.writeFile('/test3.txt', 'hello world', function (err) {
    t.ok(!err)
    var rs = fs.createReadStream('/test3.txt', {
      start: 2,
      end: 5
    })
    rs.pipe(through(function (chunk, enc, callback) {
      t.same(chunk, new Buffer('llo '))
      fs.unlink('/test3.txt', function (err) {
        t.ok(!err, 'unlinked /test3.txt')
        t.end()
        callback()
      })
    }))
  })
})

test('createReadStream enoent', function (t) {
  var rs = fs.createReadStream('/test123.txt')
  rs.on('error', function (err) {
    t.ok(err)
    t.same(err.code, 'ENOENT')
    t.ok(true)
    t.end()
  })
})