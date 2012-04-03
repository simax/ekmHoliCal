class UserSchemaBuilder

	constructor: ->

		@mongoose = require 'mongoose'
		@schema = @mongoose.Schema
		@ObjectId = @schema.ObjectId

		@UserSchema = new @schema
		 	'firstname': { type: String, required: true }, 
		 	'lastname': { type: String, required: true }, 
		 	'email': { type: String, required: true, index: { unique: true }, validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ },
		 	'departmentId': String,
		 	'startdate': String,
		 	'enddate': String,
		 	'active': { type: Boolean, default: true } 
		 
		# Register a entity Mongo collection
		@Model = @mongoose.model 'Users', @UserSchema

		con = @mongoose.connect 'mongodb://localhost:8120/ekmHoliCal'


class UserRoutes

	constructor: ->
		@Model = new UserSchemaBuilder().Model

	post: (req, res) =>
		entity = new @Model
		@modelBind(entity, req)
		entity.save (err) =>
			@save(entity, res, err)
 
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
			@modelBind entity, req
			entity.save (err) =>
 				@save(entity, res, err)
 
	delete: (req, res) =>
		@Model.findById req.params.id, (err, entity) ->
			entity.remove()
			res.send(204)

	modelBind: (entity, req) =>
		entity.firstname = req.body.firstname
		entity.lastname = req.body.lastname
		entity.email = req.body.email
		entity.departmentId = req.body.departmentId 
		entity.startdate = req.body.startdate
		entity.enddate = ""
		entity.active = req.body.active

	save: (entity, res, err) -> 
		if err 
			console.log err 
			if err.code = 1101
				res.send("Already exists", 400) 
				return
			res.send("Unable to process request", 500) 
		else
			res.send(entity)	

module.exports = new UserRoutes()
