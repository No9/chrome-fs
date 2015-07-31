var test = require('tape').test
var fs = require('../../chrome')

test('writeFile', function (t) {
  fs.writeFile('/test.txt', 'hello', function (err) {
    t.notOk(err)
    fs.readFile('/test.txt', function (err, data) {
      t.notOk(err)
      t.same(data.toString(), 'hello')
      fs.stat('/test.txt', function (err, stat) {
        t.notOk(err)
        t.same(stat.size, 5)
        t.ok(stat.isFile())
        fs.unlink('/test.txt', function (err) {
          t.ok(!err, 'unlinked /test.txt')
          t.end()
        })
      })
    })
  })
})

// test('writeFile + encoding', function (t) {
//   fs.writeFile('/foo.txt', new Buffer('foo'), function (err) {
//     t.notOk(err)
//     fs.readFile('/foo.txt', function (err, data) {
//       t.notOk(err)
//       t.same(data.toString(), 'foo', 'data is foo')
//       fs.writeFile('/foo.txt', '68656c6c6f', 'hex', function (err) {
//         t.notOk(err)
//         fs.readFile('/foo.txt', function (err, data) {
//           t.notOk(err)
//           t.same(data.toString(), 'hello', 'encoding isn\'t equal')
//           fs.unlink('/foo.txt', function (err) {
//             t.ok(!err, 'unlinked /foo.txt')
//             t.end()
//           })
//         })
//       })
//     })
//   })
// })

test('multiple writeFile', function (t) {
  fs.writeFile('/mfoo.txt', new Buffer('foo'), function (err) {
    t.notOk(err)
    fs.writeFile('/mfoo.txt', new Buffer('bar'), function (err) {
      t.notOk(err)
      fs.writeFile('/mfoo.txt', new Buffer('baz'), function (err) {
        t.notOk(err)
        console.log('WROTTE BAZ')
        fs.readFile('/mfoo.txt', function (err, data) {
          t.notOk(err)
          t.same(data.toString(), 'baz')
          fs.unlink('/mfoo.txt', function (err) {
            t.ok(!err, 'unlinked /foo.txt')
            t.end()
          })
        })
      })
    })
  })
})

test('writeFile + mode', function (t) {
  fs.writeFile('/foo', new Buffer('foo'), {mode: '0644'}, function (err) {
    t.notOk(err)
    fs.stat('/foo', function (err, stat) {
      // Removed modeq as it isn't supported.
      t.notOk(err)
      fs.unlink('/foo', function (err) {
        t.ok(!err, 'unlinked /foo')
        t.end()
      })
    })
  })
})

test('overwrite file', function (t) {
  fs.writeFile('/test.txt', 'foo', function (err) {
    t.notOk(err)
    fs.writeFile('/test.txt', 'bar', function (err) {
      t.notOk(err)
      fs.readFile('/test.txt', function (err, data) {
        t.notOk(err)
        t.same(data.toString(), 'bar')
        fs.unlink('/test.txt', function (err) {
          t.ok(!err, 'unlinked /test.txt')
          t.end()
        })
      })
    })
  })
})

test('cannot writeFile to dir', function (t) {
  fs.mkdir('/testdir', function () {
    fs.writeFile('/testdir', 'hello', function (err) {
      t.ok(err)
      t.same(err.code, 'EISDIR')
      fs.rmdir('/testdir', function (err) {
        t.ok(!err)
        t.end()
      })
    })
  })
})
