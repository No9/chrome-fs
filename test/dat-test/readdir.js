var test = require('tape').test
var fs = require('../../chrome')

test('readdir', function (t) {
  fs.readdir('/', function (err, list) {
    t.notOk(err)
    t.same(list, [])

    fs.readdir('/foo', function (err, list) {
      t.ok(err)
      t.notOk(list)
      t.same(err.code, 'ENOENT')

      fs.mkdir('/foo', function () {
        fs.readdir('/', function (err, list) {
          t.notOk(err)
          t.same(list, ['foo'])

          fs.readdir('/foo', function (err, list) {
            t.notOk(err)
            t.same(list, [])
            fs.rmdir('/foo', function (err) {
              t.notOk(err)
              t.end()
            })

          })
        })
      })
    })
  })
})

test('readdir not recursive', function (t) {
  fs.mkdir('/foo', function () {
    fs.mkdir('/foo/bar', function () {
      fs.mkdir('/foo/bar/baz', function () {
        fs.readdir('/foo', function (err, list) {
          t.notOk(err)
          t.same(list, ['bar'])
          fs.readdir('/foo/bar', function (err, list) {
            t.notOk(err)
            t.same(list, ['baz'])
            fs.rmdir('/foo/bar/baz', function (err) {
              t.notOk(err)
              fs.rmdir('/foo/bar', function (err) {
                t.notOk(err)
                fs.rmdir('/foo', function (err) {
                  t.notOk(err)
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
