define (require) ->

  class EmployeesLayoutView extends Backbone.Marionette.Layout

    initialize: ->
      @template = require 'text!../../templates/tmpl.employees.layout.html'

    regions:
      navigationRegion: "#employee-navigation-region"
      listRegion: "#employee-list-region" 