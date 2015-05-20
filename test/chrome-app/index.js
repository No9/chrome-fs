var fs = require('../../chrome')
var assert = require('assert')
var test = require('tape')
var rpt = document.getElementById('outputlist')

test('api test', function (t) {
  t.plan(1)
  var rnpath = '/file' + Date.now() + '-old.txt'
  var rnstr = 'some content\n'
  fs.open(rnpath, 'w', function (err, fd) {
    if (err) {
      throw 'error opening file: ' + err.message
    }
    fs.write(fd, rnstr, 0, function (err) {
      if (err) throw 'error writing file: ' + err

      t.ok()
      fs.close(fd, function () {
        var npath = 'file' + Date.now() + '-new.txt'
        fs.rename(rnpath, npath, function (err) {
          if (err) {
            console.log(err)
          }
          fs.open(npath, 'r', function (err, fd) {
            if (err) {
              throw 'error opening file: ' + err
            }
            var buffer = new Buffer(8192)
            fs.read(fd, buffer, 0, 8192, -1, function (err, len, data) {
              if (err) throw 'error writing file: ' + err
              console.log('read callback called ' + data)
            })
          })
        })
      })
    })
  })

  var path = '/file' + Date.now() + '.txt'
  var str = 'some content\n'

  fs.open(path, 'w', function (err, fd) {
    if (err) {
      throw 'error opening file: ' + err.message
    }
    fs.write(fd, str, 0, function (err) {
      if (err) throw 'error writing file: ' + err

      t.ok()
      fs.close(fd, function () {
        fs.unlink(path, function (err) {
          if (err) {
            assert.fail(err)
          }
          assert.ok(true, 'delete and callback')
        })
      })
    })
  })

/*
  var filelocation = '/test.txt'
  fs.writeFile(filelocation, 'Some lorum impsum', function () {
    assert.ok(true, 'Write with string and callback')
    fs.unlink(filelocation, function (err) {
      if (err) {
        assert.fail(err)
      }
      assert.ok(true, 'delete and callback')
    })
  })
  */
})

test.createStream().on('data', function (row) {
  var itm = document.createElement('li')
  var textnode = document.createTextNode(row)
  itm.appendChild(textnode)
  rpt.appendChild(itm)
})
