var fs = require('../../chrome')
var assert = require('assert')
var exists
var doesNotExist
var f = '/test-fs-exists.txt'
fs.writeFile(f, 'Some lorum impsum', function () {
  assert.ok(true, 'Write with string and callback')
  fs.exists(f + '-NO', function (y) {
    doesNotExist = y
    fs.exists(f, function (y) {
      exists = y
      fs.unlink(f, function (err) {
        if (err) {
          assert.fail(err)
        }
        assert.strictEqual(exists, true)
        assert.strictEqual(doesNotExist, false)
        assert.ok(true, 'delete and callback')
        console.log('test-fs-exists success')
      })
    })
  })
})
