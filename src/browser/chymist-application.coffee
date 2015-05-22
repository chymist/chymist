Menu = require 'menu'
BrowserWindow = require 'browser-window'
app = require 'app'
fs = require 'fs-plus'
ipc = require 'ipc'
path = require 'path'
os = require 'os'
net = require 'net'
url = require 'url'

{EventEmitter} = require 'events'
_ = require 'underscore-plus'

ChymistWindow = require './chymist-window'

debug = require('debug')('chymist-application')

module.exports =
class Application
  _.extend @prototype, EventEmitter.prototype

  constructor: (options) ->
    {@devMode} = options

    @windows = []

    # handle events
    app.on 'window-all-closed', ->
      debug('all windows closed')
      app.quit() if process.platform in ['win32', 'linux']

    @openWithOptions(options)

  openWithOptions: (options) ->
    newWindow = @openWindow(options)
    newWindow.show()
    @addWindow(newWindow)
    newWindow.on 'closed', =>
      debug('window closed')
      @removeWindow(newWindow)

  openWindow: (options) ->
    debug('opening new window')
    appWindow = new ChymistWindow(options)
    #@menu = new ChymistMenu
    #@menu.attachToWindow(appWindow)

    appWindow

  addWindow: (appWindow) =>
    @windows.push(appWindow)

  removeWindow: (appWindow) =>
    @windows.splice(appWindow) for w, idx in @windows when w is appWindow
