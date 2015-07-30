var test = require('tape').test
var fs = require('../../chrome')

test('truncate', function (t) {
  fs.writeFile('/test.txt', new Buffer(1), function () {
    fs.truncate('/test.txt', 10000, function (err) {
      t.ok(!err, 'truncate 10000 to grow')
      fs.stat('/test.txt', function (err, stat) {
        t.ok(!err, 'no error on first stat')
        t.same(stat.size, 10000, 'file is now 10000')
        fs.truncate('/test.txt', 1235, function () {
          fs.stat('/test.txt', function (err, stat) {
            t.ok(!err, 'no error on second stat')
            t.same(stat.size, 1235)
            fs.readFile('/test.txt', function (err, buf) {
              t.ok(!err, 'readfile worked')
              t.same(buf.length, 1235, 'size of last readfile')
              fs.unlink('/test.txt', function (err) {
                t.ok(!err, 'unlinked /test.txt')
                t.end()
              })
            })
          })
        })
      })
    })
  })
})
