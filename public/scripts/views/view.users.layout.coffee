define (require) ->

  class UsersLayoutView extends Backbone.Marionette.CompositeRegion

    initialize: ->
      @template = require 'text!../../templates/tmpl.users.layout.html'

    regions:
      navigationRegion: "#user-navigation-region"
      listRegion: "#user-list-region"