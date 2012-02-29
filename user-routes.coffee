
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
		user.firstname = req.body.firstname
		user.lastname = req.body.lastname
		user.email = req.body.email
		user.entitlement = req.body.entitlement
		user.startdate = req.body.startdate
		user.enddate = ""
		user.active = req.body.active
		
		user.save (err) ->
			console.log err if err
			res.send(err) if err 
		res.send(user)		
 
	getall: (req, res) =>
		res.contentType 'application/json' 
		@UserModel.find (err, users) ->
			res.send(users)

	get: (req, res) =>
		console.log "req.params.id:" + req.params.id + "req.body.id: " + req.body.id
		@UserModel.findById req.params.id, (err, doc) ->
			res.send(doc)

	put: (req, res) =>
		@UserModel.findById req.params.id, (err, doc) ->
			doc.update()
			res.send(200)

	delete: (req, res) =>
		@UserModel.findById req.params.id, (err, doc) ->
			doc.remove()
			res.send(204)

module.exports = new UserRoutes()
