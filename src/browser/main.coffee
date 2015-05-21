global.shellStartTime = Date.now() # record when this js starts executing

crashReporter = require 'crash-reporter'
app = require 'app'
url = require 'url'
path = require 'path'
fs = require 'fs-plus'
yargs = require 'yargs'

debug = require('debug')('main.coffee')

start = ->
  debug('entered start')
  args = parseCommandLine()

  app.on 'will-finish-launching', ->
    setupCrashReporter()

  app.on 'ready', ->
    debug('app ready')
    cwd = args.executedFrom?.toString() or process.cwd()

    debug('instantiating ChymistApplication')
    ChymistApplication = require './chymist-application'
    debug('opening ChymistApplication')
    ChymistApplication.open(args)
    debug('ping, chymist app opened')
    console.log("App load time: #{Date.now() - global.shellStartTime}ms") if args.devMode

parseCommandLine = ->
  version = app.getVersion()
  options = yargs(process.argv[1..]).wrap(100)
  options.usage """
    Chymist v#{version}

    Usage: chymist [options] <path>

    Enviroment Variables:

      CHYMIST_HOME      The root path for all configuration files and folders
                        Defaults to `~/.chymist`.
  """

  options.alias('d', 'dev').boolean('d').describe('d', 'Run in dev mode')
  options.alias('h', 'help').boolean('h').describe('h', 'Print this usage message.')
  options.alias('v', 'version').boolean('v').describe('v', 'Print the version.')
  args = options.argv

  if args.help
    process.stdout.write(options.help())
    process.exit(0)

  if args.version
    process.stdout.write("#{version}\n")
    process.exit(0)

  devMode = args['dev']

  {devMode} # return the options in an easy-to-use hash

setupCrashReporter = ->
  crashReporter.start(productName: 'Chymist', companyName: 'Chymist')

start() # call the start function
