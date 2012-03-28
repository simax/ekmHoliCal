define (require) ->

  class MainView extends Backbone.Marionette.ItemView
    initialize: ->
      @template = require 'text!../../templates/tmpl.main.region.html'

