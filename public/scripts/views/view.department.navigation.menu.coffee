define (require) ->

  class DepartmentNavigationView extends Backbone.Marionette.ItemView
    className: "row" 

    initialize: ->
      @template = require '../../scripts/text!department_navigation.html'

    events:
      "click #create": "create"

    create: (e) ->
      e.preventDefault()
      new app.DepartmentController().adminDepartmentsCreate()
      Backbone.history.navigate("admin/users/create/")
