define (require) ->

  window.app = new Backbone.Marionette.Application() unless window.app?

  class EmployeeNavigationView extends Backbone.Marionette.ItemView
    className: "row" 

    initialize: ->
      @template = require '../../scripts/text!employee_navigation.html'
      return	

    events:
      "click #create": "create"

    create: (e) ->
      e.preventDefault()
      new app.EmployeeController().adminEmployeesCreate()
      Backbone.history.navigate("admin/employees/create/")
 