define (require) ->

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

    edit: (e) ->
      id = @model.id
      app.vent.trigger "admin:departments:edit", id  
    