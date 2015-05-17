# chrome-fs
Use the Node `fs` API in Chrome Apps

## Usage 

This library can be used directly with your browserify builds with targeting Chrome Packaged Apps. 

```
$ npm install chrome-fs --save
$ browserify -r chrome-fs:fs index.js -o bundle.js
```

## Test 

```
$ npm test
```

This will load the folder `test/chrome-app` as an unpacked extension in chrome.
Test currently designed for windows and Mac Canary support for others accepted

## Permissions 

The following permissions need to be added to your chrome packaged app for this module.

```
  "permissions": [
  	"filesystem"
  ]
```

## API Status 

Sync apis won't be supported 

- [x] rs.rename(oldPath, newPath, callback)
- ~~fs.renameSync(oldPath, newPath)~~ 
- [x] fs.ftruncate(fd, len, callback)
- ~~[ ] fs.ftruncateSync(fd, len)~~
- [ ] fs.truncate(path, len, callback)
- ~~fs.truncateSync(path, len)~~
- [ ] fs.chown(path, uid, gid, callback)
- ~~fs.chownSync(path, uid, gid)~~
- [ ] fs.fchown(fd, uid, gid, callback)
- ~~fs.fchownSync(fd, uid, gid)~~
- [ ] fs.lchown(path, uid, gid, callback)
- ~~fs.lchownSync(path, uid, gid)~~
- [ ] fs.chmod(path, mode, callback)
- ~~fs.chmodSync(path, mode)~~
- [ ] fs.fchmod(fd, mode, callback)
- ~~fs.fchmodSync(fd, mode)~~
- [ ] fs.lchmod(path, mode, callback)
- ~~fs.lchmodSync(path, mode)~~
- [ ] fs.stat(path, callback)
- [ ] fs.lstat(path, callback)
- [ ] fs.fstat(fd, callback)
- ~~fs.statSync(path)~~
- ~~fs.lstatSync(path)~~
- ~~fs.fstatSync(fd)~~
- [ ] fs.link(srcpath, dstpath, callback)
- ~~fs.linkSync(srcpath, dstpath)~~
- [ ] fs.symlink(srcpath, dstpath[, type], callback)
- ~~fs.symlinkSync(srcpath, dstpath[, type])~~
- [ ] fs.readlink(path, callback)
- ~~fs.readlinkSync(path)~~
- [ ] fs.realpath(path[, cache], callback)
- ~~fs.realpathSync(path[, cache])~~
- [x] fs.unlink(path, callback)
- ~~fs.unlinkSync(path)~~
- [ ] fs.rmdir(path, callback)
- ~~fs.rmdirSync(path)~~
- [ ] fs.mkdir(path[, mode], callback)
- ~~fs.mkdirSync(path[, mode])~~
- [ ] fs.readdir(path, callback)
- ~~fs.readdirSync(path)~~
- [x] fs.close(fd, callback)
- ~~fs.closeSync(fd)~~
- [x] fs.open(path, flags[, mode], callback)
- ~~fs.openSync(path, flags[, mode])~~
- [ ] fs.utimes(path, atime, mtime, callback)
- ~~fs.utimesSync(path, atime, mtime)~~
- [ ] fs.futimes(fd, atime, mtime, callback)
- [ ] fs.futimesSync(fd, atime, mtime)
- ~~fs.fsync(fd, callback)~~
- ~~fs.fsyncSync(fd)~~
- [ ] fs.write(fd, buffer, offset, length[, position], callback)
- [x] fs.write(fd, data[, position[, encoding]], callback)
- ~~fs.writeSync(fd, buffer, offset, length[, position])~~
- ~~fs.writeSync(fd, data[, position[, encoding]])~~
- [ ] fs.read(fd, buffer, offset, length, position, callback)
- ~~fs.readSync(fd, buffer, offset, length, position)~~
- [ ] fs.readFile(filename[, options], callback)
- ~~fs.readFileSync(filename[, options])~~
- [ ] fs.writeFile(filename, data[, options], callback)
- ~~fs.writeFileSync(filename, data[, options])~~
- [ ] fs.appendFile(filename, data[, options], callback)
- ~~fs.appendFileSync(filename, data[, options])~~
- [ ] fs.watchFile(filename[, options], listener)
- [ ] fs.unwatchFile(filename[, listener])
- [ ] fs.watch(filename[, options][, listener])
- [ ] fs.exists(path, callback)
- ~~fs.existsSync(path)~~
- [ ] fs.access(path[, mode], callback)
- ~~fs.accessSync(path[, mode])~~
Class: - [ ] fs.Stats
Stat Time Values
- [ ] fs.createReadStream(path[, options])
	Class: 
- [ ] fs.ReadStream
	Event: 'open'
- [ ] fs.createWriteStream(path[, options])
Class: 
- [ ] fs.WriteStream
	Event: 'open'
	file.bytesWritten
Class: 
- [ ] fs.FSWatcher
	watcher.close()
	Event: 'change'
	Event: 'error'

# Contributors 

anton whalley @no9 