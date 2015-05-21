app = require 'app'
ipc = require 'ipc'
Menu = require 'menu'
_ = require 'underscore-plus'

# Manages global application menu.
#
# Created by {AtomApplication} upon instantiation, and used to add, remove,
# and maintain the state of all menu items.
module.exports = class ApplicationMenu
  constructor: (@version) ->
    # stub

  addWindow: (window) ->
    # stub
