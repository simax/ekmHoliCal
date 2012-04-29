define (require) ->

  class DepartmentsLayoutView extends Backbone.Marionette.Layout

    initialize: ->
      @template = require 'text!../../templates/tmpl.departments.layout.html'

    regions:
      navigationRegion: "#department-navigation-region"
      listRegion: "#department-list-region"
