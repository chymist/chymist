app = require 'app'
url = require 'url'
path = require 'path'
fs = require 'fs-plus'

BrowserWindow = require 'browser-window'
ChymistApplication = require 'chymist-application'

global.shellStartTime = Date.now() # log start time so we can compute how long startup took

parseCommandLine = ->
  version = app.getVersion()

  yargs = require('yargs')
    .alias('d', 'dev').boolean('d').describe('d', 'Run in developer mode.')
    .alias('h', 'help').boolean('h').describe('h', 'Print this usage message.')
    .alias('v', 'version').boolean('v').describe('v', 'Print the version.')
  args = yargs.parse(process.argv[1..])

  if args.help
    process.stdout.write(options.help())
    process.exit(0)

  if args.version
    process.stdout.write("#{version}\n")
    process.exit(0)

  devMode = args['dev']

  {devMode}

start = ->
  # enable es6
  app.commandLine.appendSwitch 'js-flags', '--harmony'

  args = parseCommandLine()

  if (args.devMode)
    app.commandLine.appendSwitch 'remote-debugging-port', '8315'

  # don't do anything with Electron until after 'ready', because bad things happen if you don't
  app.on 'ready' ->
    ChymistApplication = require './application'
    global.application = new ChymistApplication(args)
    console.log("App load time: #{Date.now() - global.shellStartTime}ms") if args.devMode

start()
