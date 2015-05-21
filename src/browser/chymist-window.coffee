BrowserWindow = require 'browser-window'
app = require 'app'
path = require 'path'
fs = require 'fs'
url = require 'url'
_ = require 'underscore-plus'
{EventEmitter} = require 'events'

module.exports = class AtomWindow
  _.extend @prototype, EventEmitter.prototype

  @iconPath: path.resolve(__dirname, '..', '..', 'resources', 'chymist.png')

  browserWindow: null
  loaded: null

  constructor: (settings={}) ->
    {@devMode} = settings

    options =
      show: false
      title: 'Chymist'
      'web-preferences':
        'direct-write': true
        'subpixel-font-scaling': false

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
      console.log('window loaded!')
