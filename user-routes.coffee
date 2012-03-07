
class UserRoutes

	constructor: ->

		@mongoose = require 'mongoose'
		@schema = @mongoose.Schema

		# Create the user model schema
		@UserSchema = new @schema
		 	'firstname': { type: String, required: true }, 
		 	'lastname': { type: String, required: true }, 
		 	'email': { type: String, required: true, index: { unique: true }, validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ },
		 	'entitlement': { type: Number, min: 0, max: 365 },
		 	'startdate': String,
		 	'enddate': String,
		 	'active': { type: Boolean, default: true } 
		 
		# Register a users Mongo collection
		@UserModel = @mongoose.model 'Users', @UserSchema

		con = @mongoose.connect 'mongodb://localhost:8124/ekmHoliCal'

	# User routes

	post: (req, res) =>
		user = new @UserModel
		@modelBind(user, req)
		user.save (err) ->
			console.log err if err
			res.send(err) if err 
		res.send(user)		
 
	getall: (req, res) =>
		res.contentType 'application/json' 
		@UserModel.find (err, users) ->
			res.send(users)

	get: (req, res) =>
		console.log "req.params.id: " + req.params.id + "req.body.id: " + req.body.id
		@UserModel.findById req.params.id, (err, user) ->
			res.send(user)

	put: (req, res) =>
		@UserModel.findById req.params.id, (err, user) =>
			res.send(err) if err 
			@modelBind user, req
			user.save (err) ->
				res.send(err) if err 
			res.send(user)		
 
	delete: (req, res) =>
		@UserModel.findById req.params.id, (err, user) ->
			doc.remove()
			res.send(204)

	modelBind: (doc, req) =>
		console.log "req.body.firstname: " + req.body.firstname
		doc.firstname = req.body.firstname
		doc.lastname = req.body.lastname
		doc.email = req.body.email
		doc.entitlement = req.body.entitlement
		doc.startdate = req.body.startdate
		doc.enddate = ""
		doc.active = req.body.active

module.exports = new UserRoutes()
