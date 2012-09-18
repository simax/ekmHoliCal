define (require) ->

  Utils = require '../../scripts/Utils.js' 
  window.app = new Backbone.Marionette.Application() unless window.app?

  class EmployeeItemView extends Backbone.Marionette.ItemView
    template: "#tmpl-employee-item"

    initialize: ->
      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!employee_item.html'
      # @model.set "employees", new Backbone.Collection @model.get("employees")

    events:
      "click .edit": "edit"
      "click .active-status":  "toggleActivation"
      "click .btn-remove-employee": "removeEmployee" 

    toggleActivation: (e) -> 
      alert @model.get("active")

    removeEmployee: (e) ->
      remove = confirm("Remove #{@model.get('fullname')}")
      @model.urlRoot = '/ekmHoliCal/api/employees'
      @model.destroy()
      # @model.get("employees").remove(@model)

    edit: ->
      deptid = @model.get("departmentId")
      id = @model.get("id")
      new app.EmployeeController().adminEmployeesEdit(deptid, id)
      Backbone.history.navigate("admin/department/" + @model.get("departmentId") + "/employee/edit/" + @model.get("id"))

    onShow: =>
      @modelBinder.bind(@model, @el) 
      Backbone.Validation.bind(@, forceUpdate: true) 

    onClose: =>
      @modelBinder.unbind()  



