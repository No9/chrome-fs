var test = require('tape').test
var fs = require('../../chrome')

test('fstat root and folder', function (t) {
  fs.writeFile('/foofstat.txt', 'bar', function () {
    fs.open('/foofstat.txt', 'r', function (err, fd) {
      t.ok(!err, 'first open')
      fs.fstat(fd, function (err, stat) {
        t.notOk(err)
        t.ok(stat.size, 3)
        fs.unlink('/foofstat.txt', function (err) {
          t.ok(!err)
          t.end()
        })
      })
    })
  })
})

test('fstat not exist', function (t) {
  fs.fstat(42, function (err) {
    t.ok(err)
    t.same(err.code, 'EBADF')
    t.end()
  })
})
