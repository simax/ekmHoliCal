define (require) ->

  Utils = require '../../scripts/Utils.js' 
  EmployeeItemView = require '../../scripts/views/view.employee.item.js'
  window.app = new Backbone.Marionette.Application() unless window.app?
  EmptyDepartment = require '../../scripts/views/view.employee.list.empty.js'

  class EmployeeCompositeView extends Backbone.Marionette.CompositeView
    itemView: EmployeeItemView
    itemViewContainer: '#employees'
    emptyView: EmptyDepartment 

    initialize: =>
      @template = require '../../scripts/text!employee_department_header.html'
      @collection = @model.employees  
      @enhanceModel()  
      @expanded = true;

    events:
      "click .expander": "toggleExpandCollapse"
      "click .add-employee": "addEmployee"

    addEmployee: (e) =>
      e.preventDefault()
      new app.EmployeeController().adminEmployeesCreate(@model.get('_id'))
      Backbone.history.navigate("admin/employees/create/")        

    toggleExpandCollapse: (e) ->
      img = e.target
      img.src = "../../../images/" + if img.src.indexOf("expand") != -1 then "collapse.png" else "expand.png"
      $(img).parent().next().slideToggle('slow')

    enhanceModel: =>
      _.each @collection.models, (employee) => 
        employee.set "fullname", "#{employee.get('firstname')} #{employee.get('lastname')}"
        employee.set "gravatar", "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(employee.get('email'))
      return
  