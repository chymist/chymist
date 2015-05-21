BrowserWindow = require 'browser-window'
app = require 'app'
path = require 'path'
fs = require 'fs'
url = require 'url'
_ = require 'underscore-plus'
{EventEmitter} = require 'events'
debug = require('debug')('chymist-window.coffee')

module.exports = class AtomWindow
  _.extend @prototype, EventEmitter.prototype

  @iconPath: path.resolve(__dirname, '..', '..', 'resources', 'chymist.png')

  browserWindow: null
  loaded: null
  name: null

  constructor: (settings={}) ->
    {@devMode} = settings

    debug('constructing window')

    options =
      show: true
      title: 'Chymist'
      'web-preferences':
        'direct-write': true
        'subpixel-font-scaling': false

    @name = options.title

    # Don't set icon on Windows or Mac since, respectively, the exe's ico will
    # be used, or the icon in the .app specified by the plists will be used.
    if process.platform is 'linux'
      options.icon = @constructor.iconPath

    @browserWindow = new BrowserWindow options
    global.chymistApplication.addWindow(this)

    @handleEvents()

    @browserWindow.once 'window:loaded', =>
      @emit 'window:loaded'
      @loaded = true
      debug('window loaded!')

  handleEvents: ->
    @browserWindow.on 'closed', =>
      global.chymistApplication.removeWindow(this)

    @browserWindow.on 'unresponsive', =>
      dialog = require 'dialog'
      chosen = dialog.showMessageBox @browserWindow,
        type: 'warning'
        buttons: ['Close', 'Keep Waiting']
        message: 'Application not responding'
        detail: 'The application is not responding. Would you like to force close it or keep waiting?'
      @browserWindow.destroy() if chosen is 0

    @browserWindow.on 'crashed', =>
      # stub

  getDimensions: ->
    [x, y] = @browserWindow.getPosition()
    [width, height] = @browserWindow.getSize()
    {x, y, width, height}

  close: -> @browserWindow.close()

  focus: -> @browserWindow.focus()

  minimize: -> @browserWindow.minimize()

  maximize: -> @browserWindow.maximize()

  restore: -> @browserWindow.restore()

  isFocused: -> @browserWindow.isFocused()

  isMinimized: -> @browserWindow.isMinimized()

  isWebViewFocused: -> @browserWindow.isWebViewFocused()

  reload: -> @browserWindow.restart()

  toggleDevTools: -> @browserWindow.toggleDevTools()
