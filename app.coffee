
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
 
app.configure ->
	app.set 'views', __dirname + '/views'
	app.set 'view engine', 'jade'
	app.set 'view options', layout: true
	app.use express.bodyParser()
	app.use app.router
	app.use express.static(__dirname + '/public')

app.get '/ekmHoliCal/index', (req, res, next) ->
	res.render 'index'

app.get '/ekmHoliCal', (req, res) ->
	UserModel.find (err, docs) ->
		res.render 'index', 
			locals: 
				users: docs	

app.post '/ekmHoliCal/Users', (req, res) ->
	userName = req.param('username')
	addr = req.param('address')

	user = new UserModel( 
		username: userName
		address: addr
	)	
	user.save (err) ->
		res.send(err) if err 
	res.send(user)		


app.get '/ekmHoliCal/Users', (req, res) ->
	console.log "called get on : /ekmHoliCal/Users"
	res.contentType 'application/json' 
	UserModel.find (err, users) ->
		res.send(users)


app.delete '/ekmHoliCal/Users/:id', (req, res) ->
	console.log "called delete on : /ekmHoliCal/Users/:id"
	UserModel.findById req.params.id, (err, doc) ->
		doc.remove()
		res.send(204)
 
app.get '/ekmHoliCal/user/:id', (req, res) -> 
	UserModel.findById req.params.id, (err, doc) ->
		res.render 'edit',
			locals: 
				user: doc

app.get '/ekmHoliCal/find/:userName', (req, res) -> 
	
	UserModel.findOne 'username' : req.params.userName, (err, doc) ->
		if doc 
			res.send "User " + doc.username + " found"
		else
			res.send req.params.userName + " not found"
