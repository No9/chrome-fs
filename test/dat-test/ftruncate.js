var test = require('tape').test
var fs = require('../../chrome')

test('ftruncate', function (t) {
  fs.writeFile('/testftruncate.txt', new Buffer(1), function () {
    fs.open('/testftruncate.txt', 'w', function (err, fd) {
      t.ok(!err, 'Open failed')
      fs.ftruncate(fd, 10000, function (err) {
        t.ok(!err, 'first truncate')
        fs.fstat(fd, function (err, stat) {
          t.ok(!err, 'fstat error')
          t.same(stat.size, 10000)
          fs.ftruncate(fd, 1235, function () {
            fs.fstat(fd, function (err, stat) {
              t.ok(!err, 'fstat 2 error')
              t.same(stat.size, 1235)
              fs.readFile('/testftruncate.txt', function (err, buf) {
                t.ok(!err, 'readfile failed')
                t.same(buf.length, 1235, 'buffer is correct size')
                fs.unlink('/testftruncate.txt', function (err) {
                  t.ok(!err, '/testftruncate.txt delete')
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
