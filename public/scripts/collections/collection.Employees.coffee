define (require) ->

  Employee = require '../../scripts/models/model.employee.js'

  class Employees extends Backbone.Collection
    model: Employee 
    url: "/ekmHoliCal/api/employees"
 