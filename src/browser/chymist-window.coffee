Menu = require 'menu'
app = require 'app'
fs = require 'fs-plus'
ipc = require 'ipc'
path = require 'path'
os = require 'os'
net = require 'net'
url = require 'url'

{EventEmitter} = require 'events'
BrowserWindow = require 'browser-window'
_ = require 'underscore-plus'

debug = require('debug')('chymist-window')

module.exports =
class ChymistWindow
  _.extend @prototype, EventEmitter.prototype

  constructor: (options) ->
    @loadSettings =
      bootstrapScript: require.resolve '../renderer/main'

    @loadSettings = _.extend(@loadSettings, options)

    windowOpts =
      width: 800
      height: 600
      title: options.title ? 'Please set options.title!'
      'web-preferences':
          'subpixel-font-scaling': true
          'direct-write': true

    windowOpts = _.extend(windowOpts, @loadSettings)

    @window = new BrowserWindow(windowOpts)

    @handleEvents()

  handleEvents: ->
    @window.on 'closed', (e) =>
      this.emit 'closed', e

    @window.on 'devtools-opened', (e) =>
      @window.webContents.send 'window:toggle-dev-tools', true

    @window.on 'devtools-closed', (e) =>
      @window.webContents.send 'window:toggle-dev-tools', false

  show: ->
    bootstrapMarkup = path.resolve(__dirname, '..', '..', 'static', 'index.html')

    targetURL = url.format
      protocol: 'file'
      pathname: bootstrapMarkup
      slashes: true
      query: {loadSettings: JSON.stringify(@loadSettings)}
    
    @window.loadUrl targetURL
    @window.show()

  reload: ->
    @window.webContents.reload()

  toggleFullScreen: ->
    @window.setFullScreen(not @window.isFullScreen())

  toggleDevTools: ->
    @window.toggleDevTools()

  close: ->
    @window.close()
    @window = null
