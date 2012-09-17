class Schemas

  constructor: ->

    @mongoose = require 'mongoose'
    @schema = @mongoose.Schema

    @EmployeeSchema = new @schema
      'firstname': { type: String, required: true }, 
      'lastname': { type: String, required: true }, 
      'email': { type: String, required: true, index: { unique: true }, validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ },
      'departmentId': { type: String: required: true }
      'enddate': String,
      'active': { type: Boolean, default: true } 
      
    @EmployeeSchemaModel = @mongoose.model 'employees', @EmployeeSchema

    @DepartmentSchema = new @schema
      'name': { type: String, required: true, index: { unique: true } }
      'employees' : [ @EmployeeSchema ]
     
    @DepartmentSchemaModel = @mongoose.model 'departments', @DepartmentSchema

    @mongoose.connect 'mongodb://localhost:8120/ekmHoliCal'

module.exports = Schemas