
express = require 'express'
mongoose = require 'mongoose'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

# Create the model schema
UserSchema = new Schema
 	'_id': ObjectId, 'username': String 

# Register the model with Mongoose, Users is now a Mongo collection
# Create instances of UserModel (i.e. user = new UserModel(...) then call 
# user.save(...) to insert them into the Users collection)
UserModel = mongoose.model 'Users', UserSchema

con = mongoose.connect 'mongodb://localhost:8124/ekmHoliCal'
app = express.createServer().listen process.env.PORT


app.configure ->
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.static(__dirname + '/public')
  app.use express.bodyParser()
  return 
 
app.get '/ekmHoliCal', (req, res) ->
	#res.render 'Index'
	UserModel.find (err, docs) ->
		res.render 'index', 
			locals: 
				users: docs	

app.get '/ekmHoliCal/create', (req, res) -> 
	res.render 'create'
 
app.get '/ekmHoliCal/user/:id', (req, res) -> 
	UserModel.findById req.params.id, (err, doc) ->
		res.render 'edit',
			locals: 
				user: doc

app.post '/ekmHoliCal/addnewuser', (req, res) -> 
	
	userName = req.param('username')
	user = new UserModel(username : userName) 
 
	user.save (err) ->
		if !err
			# res.send user.username + " Saved successfully  !!!!" unless err
			res.redirect('/ekmHoliCal')	

app.get '/ekmHoliCal/find/:userName', (req, res) -> 
	
	UserModel.findOne 'username' : req.params.userName, (err, doc) ->
		if doc 
			res.send "User " + doc.username + " found"
		else
			res.send req.params.userName + " not found"
