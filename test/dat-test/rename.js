var test = require('tape').test
var fs = require('../../chrome')

test('rename', function (t) {
  fs.mkdir('/foo', function () {
    fs.rename('/foo', '/bar', function (err) {
      t.notOk(err, 'rename /foo /bar')

      fs.readdir('/', function (err, list) {
        t.notOk(err, 'readdir /foo /bar')
        t.same(list, ['bar'], '/bar exists')
        fs.rmdir('/bar', function (err) {
          t.ok(!err, 'rrmdir /bar shouldn\'t have an error')
          t.end()
        })
      })
    })
  })
})

// test('rename to non empty dir', function (t) {
//   fs.mkdir('/foo', function () {
//     fs.mkdir('/bar', function () {
//       fs.mkdir('/bar/baz', function () {
//         fs.rename('/foo', '/bar', function (err) {
//           t.ok(err)
//           t.same(err.code, 'ENOTEMPTY')
//
//           fs.readdir('/', function (err, list) {
//             t.notOk(err)
//             t.same(list.sort(), ['bar', 'foo'])
//             t.end()
//           })
//         })
//       })
//     })
//   })
// })
