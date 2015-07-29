var test = require('tape').test
var fs = require('../../chrome')

test('appendFile', function (t) {
  fs.writeFile('/test.txt', 'hello', function (err) {
    t.notOk(err)
    fs.appendFile('/test.txt', ' world', function (err) {
      t.notOk(err)
      fs.readFile('/test.txt', function (err, data) {
        t.notOk(err)
        t.same(data.toString(), 'hello world')
        fs.unlink('/test.txt', function (err) {
          t.ok(!err, 'unlinked /test.txt')
          t.end()
        })
      })
    })
  })
})
