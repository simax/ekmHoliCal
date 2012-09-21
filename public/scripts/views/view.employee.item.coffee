define (require) ->

  EmployeeRemoveModalView = require '../../scripts/views/view.employee.remove.modal.js'

  Utils = require '../../scripts/Utils.js' 
  window.app = new Backbone.Marionette.Application() unless window.app?

  class EmployeeItemView extends Backbone.Marionette.ItemView
    # template: "#tmpl-employee-item"

    initialize: ->
      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!employee_item.html'

    events:
      "click .edit": "edit"
      "click .btn-remove-employee": "showRemoveEmployeeModal" 

    showRemoveEmployeeModal: (e) =>
      removeModalView = new EmployeeRemoveModalView(model: @model)
      app.employeesLayoutView.removeRegion.show(removeModalView)
      

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
