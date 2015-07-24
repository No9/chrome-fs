var test = require('tape').test
var fs = require('../../chrome')

test('rmdir', function (t) {
  fs.rmdir('/', function (err) {
    t.ok(err, 'Delete / should fail')
    t.same(err.code, 'EPERM', 'Error code should be EPERM')

    fs.mkdir('/foorm', function () {
      fs.rmdir('/foorm', function (err) {
        t.notOk(err, 'rmdir /foorm should work')
        fs.rmdir('/foorm', function (err) {
          t.ok(err, 'rmdir /foorm should have an error')
          t.same(err.code, 'ENOENT')
          t.end()
        })
      })
    })
  })
})
