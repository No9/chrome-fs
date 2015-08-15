require('../simple/test-fs-stat')
require('../simple/test-fs-exists')
require('../simple/test-fs-write-file')
require('../simple/test-fs-append-file')
require('../simple/test-fs-mkdir')
require('../simple/test-fs-readdir')
require('../simple/test-fs-write')
require('../simple/test-fs-write-buffer')
require('../simple/test-fs-read')
require('../simple/test-fs-read-buffer')
require('../simple/test-fs-read-stream-fd')
require('../simple/test-fs-read-stream')
require('../simple/test-fs-empty-read-stream')
require('../dat-test/mkdir')
require('../dat-test/rmdir')
require('../dat-test/write-stream')
require('../dat-test/read-stream')
require('../dat-test/append-file')
require('../dat-test/close')
require('../dat-test/exists')
require('../dat-test/open')
require('../dat-test/read')
require('../dat-test/readdir')
require('../dat-test/rename')
require('../dat-test/read-file')
require('../dat-test/unlink')
require('../dat-test/truncate')
require('../dat-test/ftruncate')
require('../dat-test/write-file')
require('../dat-test/write')
require('../dat-test/fstat')
require('../libs/mkdirp-test')
require('../libs/https-test.js')

// UI integration
var fs = require('../../chrome')
var chooseFileButton = document.querySelector('#choose_file')
var accepts = [{
  mimeTypes: ['text/*'],
  extensions: ['js', 'css', 'txt', 'html', 'xml', 'tsv', 'csv', 'rtf']
}]

chooseFileButton.addEventListener('click', function (e) {
  chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function (theEntry) { // eslint-disable-line
    if (!theEntry) {
      document.querySelector('#textfileoutput').innerHTML = 'No file selected.'
      return
    }
    fs.open(theEntry, 'r', function (err, fd) {
      if (err) {
        document.querySelector('#textfileoutput').innerHTML = err.toString()
      }
      var b = new Buffer(1024)
      fs.read(fd, b, 0, 11, null, function (err, read) {
        if (err) {
          document.querySelector('#textfileoutput').innerHTML = err.toString()
        }
        document.querySelector('#textfileoutput').innerHTML = 'First 11 chars are: ' + b.slice(0, 11).toString()
      })
    })
  })
})
