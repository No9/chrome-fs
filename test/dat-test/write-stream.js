var fs = require('../../chrome')
var test = require('tape').test

test('createWriteStream', function (t) {
  var ws = fs.createWriteStream('/test1.txt')

  ws.write('hello ')
  ws.write('hi ')
  ws.write('ho ')
  ws.write('hey ')
  ws.end('world')

  ws.on('finish', function () {
    fs.readFile('/test1.txt', 'utf-8', function (err, buf) {
      t.ok(!err, 'Reading /test1.txt')
      t.same(buf, 'hello hi ho hey world', 'Text is the same')
      fs.unlink('/test1.txt', function (err) {
        t.ok(!err, 'unlinked /test1.txt')
        t.end()
      })
    })
  })
})

test('createWriteStream big', function (t) {
  var ws = fs.createWriteStream('/test2.txt')
  var big = new Buffer(100 * 1024)

  ws.end(big)

  ws.on('finish', function () {
    fs.readFile('/test2.txt', function (err, buf) {
      t.ok(!err, 'Read Test Shouldn\'t fail')
      t.same(buf, big, 'Buffers are equal')
      fs.unlink('/test2.txt', function (err) {
        t.ok(!err, 'unlinked /test2.txt')
        t.end()
      })
    })
  })
})

test('createWriteStream append', function (t) {
  var ws = fs.createWriteStream('/test3.txt')

  ws.write('hello ')
  ws.end('world')

  ws.on('finish', function () {
    var ws = fs.createWriteStream('/test3.txt', {flags: 'a'})

    ws.write(' hej ')
    ws.end('verden')

    ws.on('finish', function () {
      fs.readFile('/test3.txt', 'utf-8', function (err, buf) {
        t.ok(!err)
        t.same(buf, 'hello world hej verden')
        fs.unlink('/test3.txt', function (err) {
          t.ok(!err, 'unlinked /test3.txt')
          t.end()
        })
      })
    })
  })
})

test('createWriteStream not exists', function (t) {
  var ws = fs.createWriteStream('/test4.txt')

  ws.write('hello ')
  ws.end('world')

  ws.on('finish', function () {
    var ws = fs.createWriteStream('/test4.txt', {flags: 'wx'})

    ws.write(' hej ')
    ws.end('verden')

    ws.on('error', function (err) {
      t.ok(err)
      t.same(err.code, 'EEXIST')
      fs.unlink('/test4.txt', function (err) {
        t.ok(!err, 'unlinked /test4.txt')
        t.end()
      })
    })
  })
})

test('createWriteStream is dir', function (t) {
  var ws = fs.createWriteStream('/')

  ws.write('hello ')
  ws.end('world')

  ws.on('error', function (err) {
    t.ok(err)
    t.same(err.code, 'EISDIR')
    t.end()
  })
})
