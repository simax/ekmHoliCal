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
      "click .btn-remove-employee": "removeEmployee" 

    removeEmployee: (e) ->
      remove = confirm("Remove #{@model.get('fullname')}. Note: All #{@model.get('firstname')}'s details will be completeley removed")
      @model.destroy() if remove

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
