var test = require('tape').test
var fs = require('../../chrome')

test('close', function (t) {
  fs.open('/testclose', 'w', function (err, fd) {
    t.ok(!err)
    fs.close(fd, function (err) {
      t.ok(!err)
      fs.fsync(fd, function (err) {
        t.ok(err)
        t.same(err.code, 'EBADF')
        fs.unlink('/testclose', function (err) {
          t.ok(!err)
          t.end()
        })
      })
    })
  })
})
