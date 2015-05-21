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
## Caveats 

Chrome Packaged Apps don't have the notion of current working directory ```CWD```.
So relative paths are not escapted they are trimmed to be relative from root 
i.e. 
`../../direct1/file1` Will resolve to `/direct1/file1`

`.` Will resolve to `/`

If there is a more involved implementation required then please raise an issue. 

## API Status 

This list is based on the node.js documentation https://nodejs.org/api/fs.html 
Sync apis won't be supported they are listed here https://github.com/No9/chrome-fs/wiki/API-Mapping 

- [x] rs.rename(oldPath, newPath, callback)
- [x] fs.ftruncate(fd, len, callback)
- [x] fs.truncate(path, len, callback)
- [x] fs.chown(path, uid, gid, callback)
- [x] fs.fchown(fd, uid, gid, callback)
- [ ] fs.lchown(path, uid, gid, callback)
- [x] fs.chmod(path, mode, callback)
- [x] fs.fchmod(fd, mode, callback)
- [ ] fs.lchmod(path, mode, callback)
- [X] fs.stat(path, callback)
- [ ] fs.lstat(path, callback)
- [x] fs.fstat(fd, callback)
- [ ] fs.link(srcpath, dstpath, callback)
- [ ] fs.symlink(srcpath, dstpath[, type], callback)
- [ ] fs.readlink(path, callback)
- [ ] fs.realpath(path[, cache], callback)
- [x] fs.unlink(path, callback)
- [x] fs.rmdir(path, callback)
- [x] fs.mkdir(path[, mode], callback)
- [x] fs.readdir(path, callback)
- [x] fs.close(fd, callback)
- [x] fs.open(path, flags[, mode], callback)
- [ ] fs.utimes(path, atime, mtime, callback)
- [ ] fs.futimes(fd, atime, mtime, callback)
- [x] fs.write(fd, buffer, offset, length[, position], callback)
- [x] fs.write(fd, data[, position[, encoding]], callback)
- [x] fs.read(fd, buffer, offset, length, position, callback)
- [x] fs.readFile(filename[, options], callback)
- [x] fs.writeFile(filename, data[, options], callback)
- [x] fs.appendFile(filename, data[, options], callback)
- [ ] fs.watchFile(filename[, options], listener)
- [ ] fs.unwatchFile(filename[, listener])
- [ ] fs.watch(filename[, options][, listener])
- [x] fs.exists(path, callback)
- [ ] fs.access(path[, mode], callback)
Class: - [ ] fs.Stats
Stat Time Values
- [x] fs.createReadStream(path[, options])
    - Class: 
- [x] fs.ReadStream
    - Event: 'open'
- [x] fs.createWriteStream(path[, options])
Class: 
- [x] fs.WriteStream
    - Event: 'open'
    - file.bytesWritten
Class: 
- [ ] fs.FSWatcher
    - watcher.close()
    - Event: 'change'
    - Event: 'error'

# Contributors 

anton whalley @no9 