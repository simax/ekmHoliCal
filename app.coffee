
express = require 'express'
mongoose = require 'mongoose'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

# Create the model schema
UserSchema = new Schema
 	'username': String, 'address': String 
			

# Register the model with Mongoose, Users is now a Mongo collection
# Create instances of UserModel (i.e. user = new UserModel(...) then call 
# user.save(...) to insert them into the Users collection)
UserModel = mongoose.model 'Users', UserSchema

con = mongoose.connect 'mongodb://localhost:8124/ekmHoliCal'
app = express.createServer().listen process.env.PORT

root = '/ekmHoliCal'
 
app.configure ->
	app.register 'html',
		compile: (str, options) ->
			(locals) ->
				str

	app.set 'views', __dirname + '/views'
	app.set 'view engine', 'html'
	app.set 'view options', layout: false
	app.use express.bodyParser()
	app.use app.router
	app.use express.static(__dirname + '/public')

app.get root + '/index', (req, res, next) ->
	res.render 'index'

app.get root, (req, res) ->
	UserModel.find (err, docs) ->
		res.render 'index', 
			locals: 
				users: docs	

app.post root + '/Users', (req, res) ->
	userName = req.param('username')
	addr = req.param('address')

	user = new UserModel( 
		username: userName
		address: addr
	)	
	user.save (err) ->
		res.send(err) if err 
	res.send(user)		

app.get root + '/Users', (req, res) ->
	res.contentType 'application/json' 
	UserModel.find (err, users) ->
		res.send(users)

app.put root + '/Users/:id', (req, res) ->
	console.log "put @ /ekmHoliCal/Users/:id"
	UserModel.findById req.params.id, (err, doc) ->
		doc.update()
		res.send(200)

app.delete root + '/Users/:id', (req, res) ->
	UserModel.findById req.params.id, (err, doc) ->
		doc.remove()
		res.send(204)
 
app.get root + '/user/:id', (req, res) -> 
	UserModel.findById req.params.id, (err, doc) ->
		res.render 'edit',
			locals: 
				user: doc

app.get root + '/find/:userName', (req, res) -> 
	UserModel.findOne 'username' : req.params.userName, (err, doc) ->
		if doc 
			res.send "User " + doc.username + " found"
		else
			res.send req.params.userName + " not found"
