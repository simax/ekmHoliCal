
express = require 'express'
mongoose = require 'mongoose'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

# Create the user model schema
UserSchema = new Schema
 	'firstname': { type: String, required: true }, 
 	'lastname': { type: String, required: true }, 
 	'email': { type: String, required: true,  validate: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/, index: { unique: true } },
 	'entitlement': { type: Number, min: 0, max: 365 },
 	'startdate': Date,
 	'enddate': Date,
 	'active': { type: Boolean, default: true } 
 
# Register the model with Mongoose, Users is now a Mongo collection
# Create instances of UserModel (i.e. user = new UserModel(...) then call 
# user.save(...) to insert them into the Users collection)
UserModel = mongoose.model 'Users', UserSchema

con = mongoose.connect 'mongodb://localhost:8124/ekmHoliCal'
backend = express.createServer().listen process.env.PORT

root = '/ekmHoliCal'
 
backend.configure ->
	backend.register 'html',
		compile: (str, options) ->
			(locals) ->
				str

	backend.set 'views', __dirname + '/views'
	backend.set 'view engine', 'html'
	backend.set 'view options', layout: false
	backend.use express.bodyParser()
	backend.use backend.router
	backend.use express.static(__dirname + '/public')

backend.get root + '/index', (req, res, next) ->
	res.render 'index'

backend.get root, (req, res) ->
	UserModel.find (err, docs) ->
		res.render 'index', 
			locals: 
				users: docs	

backend.post root + '/Users', (req, res) ->
	userName = req.param('username')
	addr = req.param('address')

	user = new UserModel( 
		username: userName
		address: addr
	)	
	user.save (err) ->
		res.send(err) if err 
	res.send(user)		

backend.get root + '/users', (req, res) ->
	res.contentType 'application/json' 
	UserModel.find (err, users) ->
		res.send(users)

backend.put root + '/Users/:id', (req, res) ->
	UserModel.findById req.params.id, (err, doc) ->
		doc.update()
		res.send(200)

backend.delete root + '/Users/:id', (req, res) ->
	UserModel.findById req.params.id, (err, doc) ->
		doc.remove()
		res.send(204)
 
backend.get root + '/user/:id', (req, res) -> 
	UserModel.findById req.params.id, (err, doc) ->
		res.render 'edit',
			locals: 
				user: doc

backend.get root + '/find/:userName', (req, res) -> 
	UserModel.findOne 'username' : req.params.userName, (err, doc) ->
		if doc 
			res.send "User " + doc.username + " found"
		else
			res.send req.params.userName + " not found"
