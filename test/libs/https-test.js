var https = require('https')
var fs = require('../../chrome')
var assert = require('assert')

var dllocation = 'master.tar.gz'
var req = https.request('https://github.com/chromiumify/chromiumify.github.io/archive/master.tar.gz', function (res) {
  console.log(res.statusCode)
  var ws = fs.createWriteStream(dllocation)
  var filesize = 0
  ws.on('finish', function () {
    fs.stat(dllocation, function (err, stat) {
      if (err) {
        console.log(err)
        assert.fail('Stat shouln\'t fial')
      }
      assert.equal(stat.size, filesize, 'file sizes are equal:' + stat.size + ':' + filesize)
      fs.unlink(dllocation, function (err) {
        if (err) {
          console.log(err)
          assert.fail('Stat shouln\'t failed')
        } else {
          console.log('https-test success')
        }
      })
    })
  })
  res.on('data', function (data) {
    filesize += data.length
  })
  res.pipe(ws)

})
req.end()

req.on('error', function (e) {
  console.error(e)
})
