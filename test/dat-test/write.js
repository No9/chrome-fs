var test = require('tape').test
var fs = require('../../chrome')

test('write', function (t) {
  fs.open('/test1.txt', 'w', function (err, fd) {
    t.notOk(err)
    fs.write(fd, new Buffer('hello world'), 0, 11, null, function (err, written, buf) {
      t.ok(!err)
      t.ok(buf, 'Buffer exists')
      t.same(written, 11)
      fs.close(fd, function () {
        fs.readFile('/test1.txt', 'utf-8', function (err, buf) {
          t.notOk(err)
          t.same(buf, 'hello world')
          fs.unlink('/test1.txt', function (err) {
            t.ok(!err, 'unlinked /test1.txt')
            t.end()
          })
        })
      })
    })
  })
})

test('write + partial', function (t) {
  fs.open('/testpartial.txt', 'w', function (err, fd) {
    t.notOk(err)
    fs.write(fd, new Buffer('hello'), 0, 5, null, function (err, written, buf) {
      t.notOk(err)
      fs.write(fd, new Buffer(' world'), 0, 6, null, function (err, written, buf) {
        t.ok(!err)
        t.ok(buf)
        t.same(written, 6)
        fs.close(fd, function () {
          fs.readFile('/testpartial.txt', 'utf-8', function (err, buf) {
            t.notOk(err)
            t.same(buf, 'hello world')
            fs.unlink('/testpartial.txt', function (err) {
              t.ok(!err, 'unlinked /testpartial.txt')
              t.end()
            })
          })
        })
      })
    })
  })
})

test('write + pos', function (t) {
  fs.open('/testpos.txt', 'w', function (err, fd) {
    t.notOk(err)
    fs.write(fd, new Buffer('111111'), 0, 6, 0, function () {
      fs.write(fd, new Buffer('222222'), 0, 5, 0, function () {
        fs.write(fd, new Buffer('333333'), 0, 4, 0, function () {
          fs.write(fd, new Buffer('444444'), 0, 3, 0, function () {
            fs.write(fd, new Buffer('555555'), 0, 2, 0, function () {
              fs.write(fd, new Buffer('666666'), 0, 1, 0, function () {
                fs.close(fd, function () {
                  fs.readFile('/testpos.txt', 'utf-8', function (err, buf) {
                    t.notOk(err)
                    t.same(buf, '654321')
                    fs.unlink('/testpos.txt', function (err) {
                      t.ok(!err, 'unlinked /testpos.txt')
                      t.end()
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})

test('write + append', function (t) {
  fs.writeFile('/testappend.txt', 'hello world', function () {
    fs.open('/testappend.txt', 'a', function (err, fd) {
      t.notOk(err)
      fs.write(fd, new Buffer(' world'), 0, 6, null, function () {
        fs.close(fd, function () {
          fs.readFile('/testappend.txt', 'utf-8', function (err, buf) {
            t.notOk(err)
            t.same(buf, 'hello world world')
            fs.unlink('/testappend.txt', function (err) {
              t.ok(!err, 'unlinked /testappend.txt')
              t.end()
            })
          })
        })
      })
    })
  })
})
