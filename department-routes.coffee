class DepartmentSchemaBuilder

	constructor: ->

		@mongoose = require 'mongoose'
		@schema = @mongoose.Schema

		@DepartmentSchema = new @schema
			'name': String

		# Register a departments Mongo collection
		@Model = @mongoose.model 'Departments', @DepartmentSchema

		con = @mongoose.connect 'mongodb://localhost:8124/ekmHoliCal'


class DepartmentRoutes

	constructor: ->
		@Model = new DepartmentSchemaBuilder().Model

	# User routes

	post: (req, res) =>
		entity = new @Model
		@modelBind(entity, req)
		entity.save (err) ->
			console.log err if err
			res.send(err) if err 
		res.send(entity)		
 
	getall: (req, res) =>
		res.contentType 'application/json' 
		@Model.find (err, entity) ->
			res.send(entity)

	get: (req, res) =>
		console.log "req.params.id: " + req.params.id + "req.body.id: " + req.body.id
		@Model.findById req.params.id, (err, entity) ->
			res.send(entity)

	put: (req, res) =>
		@Model.findById req.params.id, (err, entity) =>
			res.send(err) if err 
			@modelBind entity, req
			entity.save (err) ->
				res.send(err) if err 
			res.send(entity)		
 
	delete: (req, res) =>
		@Model.findById req.params.id, (err, entity) ->
			entity.remove()
			res.send(204)

	modelBind: (entity, req) =>
		entity.name = req.body.name

module.exports = new DepartmentRoutes()
