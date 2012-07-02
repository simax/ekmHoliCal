define (require) ->

  Utils = require '../../scripts/Utils.js' 
  window.app = new Backbone.Marionette.Application() unless window.app?

  class UserListEmptyView extends Backbone.Marionette.ItemView

    initialize: ->
      @template = require '../../scripts/text!user_list_empty.html'
