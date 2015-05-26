var cp = require('child_process')
var os = require('os')
var path = require('path')

var CHROME = process.env.CHROME || '/Applications/Google\\ Chrome\\ Canary.app/Contents/MacOS/Google\\ Chrome\\ Canary'

switch (os.platform()) {
  case 'win32' :
    if (process.arch === 'x64') {
      CHROME = process.env.CHROME || '\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\"'
    } else {
      CHROME = process.env.CHROME || '\"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe\"'
    }
    break
  case 'darwin' :
    CHROME = process.env.CHROME || '/Applications/Google\\ Chrome\\ Canary.app/Contents/MacOS/Google\\ Chrome\\ Canary'
    break
  case 'linux' :
    CHROME = process.env.CHROME || '/opt/google/chrome/chrome'
    break
  default :
    break
}

var app = path.join(__dirname, '..', 'test/chrome-app')
var command = CHROME + ' --load-and-launch-app=' + app
var env = { cwd: path.join(__dirname, '..') }

cp.exec(command, env, function () {})
