define (require) ->
 

  Utils = require '../../scripts/Utils.js' 
  Employees = require '../../scripts/collections/collection.Employees.js' 
  
  class Department extends Backbone.Model
    
    defaults:
      name: ""

    initialize: =>        
      @on 'validated', (isValid, model, attrs) -> Utils.showValidationErrors()

    urlRoot: '/ekmHoliCal/api/departments/' 
    idAttribute: "_id"

    validation: 
      
      name:
        required: true
        msg: 'A department name is required'
 
    parse: (response) =>
      @employees = new Employees(response.employees)
      # delete response.employees
      response