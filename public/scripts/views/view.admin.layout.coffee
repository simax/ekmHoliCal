define (require) ->

  class AdminLayoutView extends Backbone.Marionette.Layout

    initialize: ->
      @template = require 'text!../../templates/tmpl.admin.layout.html'

    regions:
      navigationRegion: "#admin-navigation-region"
      contentRegion: "#admin-content-region"