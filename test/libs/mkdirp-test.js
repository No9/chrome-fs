var fs = require('../../chrome')
var mkdirp = require('mkdirp')
var path = '/herp/derp'
var assert = require('assert')

mkdirp(path, { 'fs': fs }, function (success) {
  fs.exists(path, function (exists) {
    fs.rmdir(path, function (err) {
      assert.equal(typeof err, 'undefined')
      fs.rmdir('/herp', function (err) {
        assert.equal(typeof err, 'undefined')
        assert.ok('mkdirp works')
        console.log('mkdirp-test success')
      })
    })
  })
})
