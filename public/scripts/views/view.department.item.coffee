define (require) ->

  window.app = new Backbone.Marionette.Application() unless window.app?

  class DepartmentItemView extends Backbone.Marionette.ItemView
    template: "#tmpl-department-item"
    tagName: "tr"

    initialize: ->
      @template = require '../../scripts/text!department_item.html'

    events:
      "click .edit": "edit"
      "click .active-status": "toggleActivation"

    toggleActivation: (e) ->
      alert JSON.stringify @model.get("active")

    edit: =>
      new app.DepartmentController().adminDepartmentsEdit(@model.id)
      Backbone.history.navigate("admin/departments/edit/" + @model.id)