var test = require('tape').test
var fs = require('../../chrome')

test('read', function (t) {
  fs.writeFile('/testread', 'hello worldy world', function (err) {
    t.ok(!err, 'no error on write file')
    fs.open('/testread', 'r', function (err, fd) {
      t.ok(!err, 'no error on open')
      var b = new Buffer(1024)
      fs.read(fd, b, 0, 11, null, function (err, read) {
        t.ok(!err, 'no error on read')
        t.same(read, 11, 'read length is correct')
        t.same(b.slice(0, 11), new Buffer('hello world'), 'buffer says hello world')
        fs.read(fd, b, 0, 11, null, function (err, read) {
          t.ok(!err, 'second read has no error')
          t.same(read, 7, 'second read length is correct')
          t.same(b.slice(0, 11), new Buffer('y worldorld'), 'second read text is correct')
          fs.unlink('/testread', function (err) {
            t.ok(!err)
            t.end()
          })
        })
      })
    })
  })
})

test('read test 2', function (t) {
  fs.writeFile('/testread2', 'hello worldy world', function () {
    fs.open('/testread2', 'r', function (err, fd) {
      t.ok(!err)
      var b = new Buffer(1024)
      fs.read(fd, b, 0, 11, 0, function (err, read) {
        t.ok(!err, 'no error on read')
        t.same(read, 11, 'read length is correct')
        t.same(b.slice(0, 11), new Buffer('hello world'), 'read hello world')
        fs.read(fd, b, 0, 11, 1, function (err, read) {
          t.ok(!err, 'no error on second read')
          t.same(read, 11, 'second read length 11')
          t.same(b.slice(0, 11), new Buffer('ello worldy'), 'second read data is the same')
          fs.unlink('/testread2', function (err) {
            t.ok(!err)
            t.end()
          })
        })
      })
    })
  })
})
