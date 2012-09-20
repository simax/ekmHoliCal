class Schemas

  constructor: ->
    @mongoose = require 'mongoose'
    @schema = @mongoose.Schema

    @EmployeeSchema = new @schema
      'firstname': { type: String, required: true, trim: true }, 
      'lastname': { type: String, required: true, trim: true }, 
      'email': { type: String, required: true, trim: true, index: true, validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ },
      'departmentId': { type: @schema.ObjectId, trim: true, required: true }
      'enddate': {type: String, trim: true }
      'active': { type: Boolean, default: true } 
      
    @EmployeeSchemaModel = @mongoose.model 'employees', @EmployeeSchema

    @DepartmentSchema = new @schema
      'name': { type: String, required: true, trim: true, index: { unique: true } }
      'employees' : [ @EmployeeSchema ]
     
    @DepartmentSchemaModel = @mongoose.model 'departments', @DepartmentSchema
    @mongoose.connect('mongodb://localhost:8120/ekmHoliCal')

module.exports = Schemas