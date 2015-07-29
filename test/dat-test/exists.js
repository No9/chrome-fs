var test = require('tape').test
var fs = require('../../chrome')

test('exists', function (t) {
  fs.exists('/', function (exists) {
    t.ok(exists, '/ exists')
    fs.exists('/foox', function (exists) {
      t.notOk(exists, '/foox does not exist')
      fs.mkdir('/foox', function () {
        fs.exists('/foox', function (exists) {
          t.ok(exists, '/foox exists second')
          fs.rmdir('/foox', function (err) {
            t.ok(!err, 'rmdir /foox')
            t.end()
          })
        })
      })
    })
  })
})
