define (require) ->

  Utils = require '../../scripts/Utils.js' 
  window.app = new Backbone.Marionette.Application() unless window.app?

  class EmployeeListEmptyView extends Backbone.Marionette.ItemView

    initialize: ->
      @template = require '../../scripts/text!employee_list_empty.html'
