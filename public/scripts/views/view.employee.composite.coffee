define (require) ->

  Utils = require '../../scripts/Utils.js' 
  EmployeeItemView = require '../../scripts/views/view.employee.item.js'
  window.app = new Backbone.Marionette.Application() unless window.app?

  class EmployeeCompositeView extends Backbone.Marionette.CompositeView
    itemView: EmployeeItemView
    itemViewContainer: '#employees'

    initialize: =>
      @template = require '../../scripts/text!employee_department_header.html'
      @collection = new Backbone.Collection @model.get("employees") 
      @enhanceModel()

    enhanceModel: =>
      _.each @collection.models, (employee) => 
        employee.set "fullname", "#{employee.get('firstname')} #{employee.get('lastname')}"
        employee.set "gravatar", "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(employee.get('email'))
      return
  