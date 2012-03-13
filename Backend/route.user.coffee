class UserSchemaBuilder

	constructor: ->

		@mongoose = require 'mongoose'
		@schema = @mongoose.Schema

		@UserSchema = new @schema
		 	'firstname': { type: String, required: true }, 
		 	'lastname': { type: String, required: true }, 
		 	'email': { type: String, required: true, index: { unique: true }, validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ },
		 	'department': String,
		 	'startdate': String,
		 	'enddate': String,
		 	'active': { type: Boolean, default: true } 
		 
		# Register a entity Mongo collection
		@Model = @mongoose.model 'Users', @UserSchema

		con = @mongoose.connect 'mongodb://localhost:8124/ekmHoliCal'


class UserRoutes

	constructor: ->
		@Model = new UserSchemaBuilder().Model

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
		console.log "req.body.firstname: " + req.body.firstname
		entity.firstname = req.body.firstname
		entity.lastname = req.body.lastname
		entity.email = req.body.email
		entity.department = req.body.department
		entity.startdate = req.body.startdate
		entity.enddate = ""
		entity.active = req.body.active

module.exports = new UserRoutes()
