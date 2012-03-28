define (require) ->

  Backbone = require 'backbone'


  class UsersLayoutView extends Backbone.Marionette.CompositeRegion
    # template: "#tmpl-users-layout"

    initialize: ->
      @template = require 'text!../../templates/tmpl.users.layout.html'

    regions:
      navigationRegion: "#user-navigation-region"
      listRegion: "#user-list-region"

  UsersLayoutView