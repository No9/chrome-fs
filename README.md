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

This list is based on the node.js documentation https://nodejs.org/api/fs.html 
Sync apis won't be supported they are listed here https://github.com/No9/chrome-fs/wiki/API-Mapping 

- [x] rs.rename(oldPath, newPath, callback)
- [x] fs.ftruncate(fd, len, callback)
- [ ] fs.truncate(path, len, callback)
- [ ] fs.chown(path, uid, gid, callback)
- [ ] fs.fchown(fd, uid, gid, callback)
- [ ] fs.lchown(path, uid, gid, callback)
- [ ] fs.chmod(path, mode, callback)
- [ ] fs.fchmod(fd, mode, callback)
- [ ] fs.lchmod(path, mode, callback)
- [ ] fs.stat(path, callback)
- [ ] fs.lstat(path, callback)
- [ ] fs.fstat(fd, callback)
- [ ] fs.link(srcpath, dstpath, callback)
- [ ] fs.symlink(srcpath, dstpath[, type], callback)
- [ ] fs.readlink(path, callback)
- [ ] fs.realpath(path[, cache], callback)
- [x] fs.unlink(path, callback)
- [ ] fs.rmdir(path, callback)
- [ ] fs.mkdir(path[, mode], callback)
- [ ] fs.readdir(path, callback)
- [x] fs.close(fd, callback)
- [x] fs.open(path, flags[, mode], callback)
- [ ] fs.utimes(path, atime, mtime, callback)
- [ ] fs.futimes(fd, atime, mtime, callback)
- [ ] fs.futimesSync(fd, atime, mtime)
- [x] fs.write(fd, buffer, offset, length[, position], callback)
- [x] fs.write(fd, data[, position[, encoding]], callback)
- [x] fs.read(fd, buffer, offset, length, position, callback)
- [ ] fs.readFile(filename[, options], callback)
- [ ] fs.writeFile(filename, data[, options], callback)
- [ ] fs.appendFile(filename, data[, options], callback)
- [ ] fs.watchFile(filename[, options], listener)
- [ ] fs.unwatchFile(filename[, listener])
- [ ] fs.watch(filename[, options][, listener])
- [ ] fs.exists(path, callback)
- [ ] fs.access(path[, mode], callback)
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