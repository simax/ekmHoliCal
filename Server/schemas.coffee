class DepartmentSchemaBuilder

  constructor: ->

    @mongoose = require 'mongoose'
    @schema = @mongoose.Schema

    @DepartmentSchema = new @schema
      'name': { type: String, required: true, index: { unique: true } }
      'users': [{ type: @schema.ObjectId, ref: 'users'}]



    # Register a departments Mongo collection
    @Model = @mongoose.model 'departments', @DepartmentSchema

    con = @mongoose.connect 'mongodb://localhost:8120/ekmHoliCal'

class UserSchemaBuilder

  constructor: ->

    @mongoose = require 'mongoose'
    @schema = @mongoose.Schema
    @ObjectId = @schema.ObjectId

    @UserSchema = new @schema
      'firstname': { type: String, required: true }, 
      'lastname': { type: String, required: true }, 
      'email': { type: String, required: true, index: { unique: true }, validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ },
      'departmentId': { type: String: required: true }
      'enddate': String,
      'enddate': String,
      'active': { type: Boolean, default: true } 
     
    # Register a users Mongo collection
    @Model = @mongoose.model 'users', @UserSchema

    con = @mongoose.connect 'mongodb://localhost:8120/ekmHoliCal'

exports.DepartmentSchemaBuilder = DepartmentSchemaBuilder
exports.UserSchemaBuilder = UserSchemaBuilder
