ChymistWindow = require './chymist-window'
ApplicationMenu = require './application-menu'
BrowserWindow = require 'browser-window'
Menu = require 'menu'
app = require 'app'
fs = require 'fs-plus'
ipc = require 'ipc'
path = require 'path'
os = require 'os'
net = require 'net'
url = require 'url'
{EventEmitter} = require 'events'
debug = require('debug')('chymist-application.coffee')
_ = require 'underscore-plus'

# The application's singleton class
#
# It's the main entry point into Chymist proper, and also
# maintains the global state of the application.
#
module.exports = class ChymistApplication
  _.extend @prototype, EventEmitter.prototype # this is, in effect, inheritance

  # A public method, the entry point into the application
  @open: (options) ->
    debug('@open called')
    createChymistApp = -> new ChymistApplication(options)
    debug('creating chymist app')
    createChymistApp()
    debug('@open done')
    return

  applicationMenu: null
  windows: null
  version: null
  quitting: null

  exit: (status) -> app.exit(status)

  constructor: (options) ->
    {@devMode} = options

    global.chymistApplication = this

    @windows = []

    debug('creating app menu')
    @applicationMenu = new ApplicationMenu(@version)
    @setupJavaScriptArguments()
    @handleEvents()

  removeWindow: (window) ->
    @windows.splice @windows.indexOf(window), 1
    if @windows.length is 0
      @applicationMenu?.enableWindowSpecificItems(false)
      # only delete the menubar and quit on win32 and linux because of mac osx's
      # odd menubar behavior paradigm.
      if process.platform in ['win32', 'linux']
        app.quit()
        return

  addWindow: (window) ->
    @windows.push window
    @applicationMenu?.addWindow(window.browserWindow)
    focusHandler = => @lastFocusedWindow = window
    blurHandler = => return
    window.browserWindow.on 'focus', focusHandler
    window.browserWindow.on 'blur', blurHandler
    window.browserWindow.once 'closed', =>
      @lastFocusedWindow = null if window is @lastFocusedWindow
      window.browserWindow.removeListener 'focus', focusHandler
      window.browserWindow.removeListener 'blur', blurHandler

  # Configures required javascript environment flags.
  setupJavaScriptArguments: ->
    debug('setup javascript args')
    app.commandLine.appendSwitch 'js-flags', '--harmony'

  handleEvents: ->
    getLoadSettings = =>
      devMode: @focusedWindow()?.devMode

    app.on 'before-quit', =>
      @quitting = true

    app.on 'will-quit', =>
      #@killAllProcesses()
