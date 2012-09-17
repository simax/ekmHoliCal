define (require) ->

  Department = require '../../scripts/models/model.department.js'

  class Departments extends Backbone.Collection
    model: Department
    url: "/ekmHoliCal/api/departments"

    parse: (resp, xhr) ->
      for deps in resp
        for employee in deps.employees 
          employee.id = employee._id
      resp    
