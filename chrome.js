exports.rename = function (oldPath, newPath, callback) {
  callback()
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
