var util = require('util')

var FILESYSTEM_DEFAULT_SIZE = 250 * 1024 * 1024	// 250MB
var DEBUG = true

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem

function nullCheck (path, callback) {
  if (('' + path).indexOf('\u0000') !== -1) {
    var er = new Error('Path must be a string without null bytes.')
    if (!callback) {
      throw er
    }
    process.nextTick(function () {
      callback(er)
    })
    return false
  }
  return true
}

function maybeCallback (cb) {
  return util.isFunction(cb) ? cb : rethrow()
}

function makeCallback (cb) {
  if (util.isNullOrUndefined(cb)) {
    return rethrow()
  }

  if (!util.isFunction(cb)) {
    throw new TypeError('callback must be a function')
  }

  return function () {
    return cb.apply(null, arguments)
  }
}

function rethrow () {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  if (DEBUG) { // eslint-disable-line
    var backtrace = new Error()
    return function (err) {
      if (err) {
        backtrace.stack = err.name + ': ' + err.message +
                          backtrace.stack.substr(backtrace.name.length)
        err = backtrace
        throw err
      }
    }
  }
}

function trimSlashes (path) {
  var retString = path
  if (retString[0] === '/') {
    retString = retString.slice(1)
  }
  if (retString[retString.length - 1] === '/') {
    retString = retString.slice(0, retString.length - 1)
  }
  return retString
}

function assertEncoding (encoding) {
  if (encoding && !Buffer.isEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding)
  }
}

function modeNum (m, def) {
  if (util.isNumber(m)) {
    return m
  }
  if (util.isString(m)) {
    return parseInt(m, 8)
  }
  if (def) {
    return modeNum(def)
  }
  return undefined
}

exports.rename = function (oldPath, newPath, callback) {
  callback = makeCallback(callback)

  if (!nullCheck(oldPath, callback)) {
    return
  }

  if (!nullCheck(newPath, callback)) {
    return
  }
  oldPath = trimSlashes(oldPath)
  newPath = trimSlashes(newPath)
  var tmpPath = newPath.split('/')
  var newFileName = tmpPath.pop()
  var toDirectory = tmpPath.join('/')
  if (toDirectory === '') {
    toDirectory = '/'
  }
  console.log('oldPath ' + oldPath)
  console.log('toDirectory ' + toDirectory)
  console.log('newFileName ' + newFileName)

  window.requestFileSystem(
      window.PERSISTENT, FILESYSTEM_DEFAULT_SIZE,
      function (cfs) {
        cfs.root.getFile(oldPath, {},
              function (fileEntry) {
                fileEntry.onerror = callback
                cfs.root.getDirectory(toDirectory, {}, function (dirEntry) {
                  fileEntry.moveTo(dirEntry, newFileName)
                }, callback)
                fileEntry.moveTo(toDirectory, newFileName, callback)
              }, callback)
      }, callback)
}

exports.ftruncate = function (fd, len, callback) {
  if (util.isFunction(len)) {
    callback = len
    len = 0
  } else if (util.isUndefined(len)) {
    len = 0
  }
  var cb = makeCallback(callback)
  fd.onerror = cb
  fd.onwriteend = cb
  fd.truncate(len)
}

exports.truncate = function (path, len, callback) {
  if (util.isNumber(path)) {
    return this.ftruncate(path, len, callback)
  }
  if (util.isFunction(len)) {
    callback = len
    len = 0
  } else if (util.isUndefined(len)) {
    len = 0
  }

  callback = maybeCallback(callback)
  this.open(path, 'r+', function (er, fd) {
    if (er) return callback(er)
    fd.onwriteend = callback
    fd.truncate(len)
  })
}

exports.writeFile = function (path, data, options, cb) {
  var callback = maybeCallback(arguments[arguments.length - 1])

  if (util.isFunction(options) || !options) {
    options = { encoding: 'utf8', mode: 438, flag: 'w' }  /*=0666*/
  } else if (util.isString(options)) {
    options = { encoding: options, mode: 438, flag: 'w' }
  } else if (!util.isObject(options)) {
    throw new TypeError('Bad arguments')
  }

  assertEncoding(options.encoding)
  callback()
}

exports.open = function (path, flags, mode, callback) {
  path = trimSlashes(path)
  callback = makeCallback(arguments[arguments.length - 1])
  mode = modeNum(mode, 438 /*=0666*/)

  if (!nullCheck(path, callback)) return
  window.requestFileSystem(
        window.PERSISTENT, FILESYSTEM_DEFAULT_SIZE,
        function (cfs) {
          console.log('Filesystem: ' + cfs)
          var opts = {}
          if (flags === 'w') {
            opts = {create: true, exclusive: true}
          }
          cfs.root.getFile(
                path,
                opts,
                function (fileEntry) {
                  console.log('fileEntry: ' + fileEntry)
                  // if its a write then we get the file writer
                  // otherwise we get the file because 'standards'
                  if (flags === 'w') {
                    fileEntry.createWriter(function (fileWriter) {
                      callback(null, fileWriter)
                    }, callback)
                  } else {
                    callback(null, fileEntry)
                  }
                }, callback)
        }, callback)
}

exports.read = function (fd, buffer, offset, length, position, callback) {
  if (!util.isBuffer(buffer)) {
    console.log('THIS ISNT A BUFFER')
    // legacy string interface (fd, length, position, encoding, callback)
    var cb = arguments[4],
        encoding = arguments[3]

    assertEncoding(encoding)

    position = arguments[2]
    length = arguments[1]
    buffer = new Buffer(length)
    offset = 0

    callback = function (err, bytesRead) {
      if (!cb) return

      var str = (bytesRead > 0) ? buffer.toString(encoding, 0, bytesRead) : '' // eslint-disable-line

      (cb) (err, str, bytesRead)
    }
  }
  fd.onerror = callback
  fd.file(function (file) {
    var fileReader = new FileReader() // eslint-disable-line
    console.log('created file reader')
    fileReader.onload = function (evt) {
      console.log(this.result)
      // (err, bytesRead, buffer)
      callback(null, this.result.length, this.result)
    }
    fileReader.onerror = function (evt) {
      callback(evt, null)
    }

    if (file.type === 'text/plain') {
      fileReader.readAsText(file)
    } else if (file.type === 'application/octet-binary') {
      fileReader.readAsArrayBuffer(file)
    }
  }, callback)
}

exports.write = function (fd, buffer, offset, length, position, callback) {
  if (util.isBuffer(buffer)) {
    if (util.isFunction(position)) {
      callback = position
      position = null
    }
    callback = maybeCallback(callback)
    fd.onerror = callback
    var bufblob = new Blob([buffer.slice(offset, length)], {type: 'application/octet-binary'}) // eslint-disable-line
    fd.write(bufblob)
    callback()
  }

  if (util.isString(buffer)) {
    buffer += ''
  }

  if (!util.isFunction(position)) {
    if (util.isFunction(offset)) {
      position = offset
      offset = null
    } else {
      position = length
    }
    length = 'utf8'
  }
  console.log(fd)
  callback = maybeCallback(position)
  fd.onerror = callback
  var blob = new Blob([buffer], {type: 'text/plain'}) // eslint-disable-line
  if (position !== null) {
    fd.seek(position)
  }
  fd.write(blob)
  callback()
}

exports.unlink = function (fd, callback) {
  var path = trimSlashes(fd)
  window.requestFileSystem(
        window.PERSISTENT, FILESYSTEM_DEFAULT_SIZE,
        function (cfs) {
          cfs.root.getFile(
                path,
                {exclusive: true},
                function (fileEntry) {
                  fileEntry.remove(callback)
                })
        }, callback)
}

exports.close = function (fd, callback) {
  fd.onwriteend = makeCallback(callback)
}

/*
fs.rename(oldPath, newPath, callback)
fs.ftruncate(fd, len, callback)
fs.truncate(path, len, callback)
fs.chown(path, uid, gid, callback)
fs.fchown(fd, uid, gid, callback)
fs.lchown(path, uid, gid, callback)
fs.chmod(path, mode, callback)
fs.fchmod(fd, mode, callback)
fs.lchmod(path, mode, callback)
fs.stat(path, callback)
fs.lstat(path, callback)
fs.fstat(fd, callback)
fs.link(srcpath, dstpath, callback)
fs.symlink(srcpath, dstpath[, type], callback)
fs.readlink(path, callback)
fs.realpath(path[, cache], callback)
fs.unlink(path, callback)
fs.rmdir(path, callback)
fs.mkdir(path[, mode], callback)
fs.readdir(path, callback)
fs.close(fd, callback)
fs.open(path, flags[, mode], callback)
fs.utimes(path, atime, mtime, callback)
fs.futimes(fd, atime, mtime, callback)
fs.fsync(fd, callback)
fs.write(fd, buffer, offset, length[, position], callback)
fs.write(fd, data[, position[, encoding]], callback)
fs.read(fd, buffer, offset, length, position, callback)
fs.readFile(filename[, options], callback)
fs.writeFile(filename, data[, options], callback)
fs.appendFile(filename, data[, options], callback)
fs.watchFile(filename[, options], listener)
fs.unwatchFile(filename[, listener])
fs.watch(filename[, options][, listener])
Caveats
Availability
Filename Argument
fs.exists(path, callback)
fs.access(path[, mode], callback)
Class: fs.Stats
Stat Time Values
fs.createReadStream(path[, options])
	Class: fs.ReadStream
	Event: 'open'
fs.createWriteStream(path[, options])
Class: fs.WriteStream
	Event: 'open'
	file.bytesWritten
Class: fs.FSWatcher
	watcher.close()
	Event: 'change'
	Event: 'error'
*/
