dbMan = require './DbManager'
db = dbMan.db

class DepartmentRoutes
  
	post: (req, res) =>
		entity.save (err) =>
			@save(entity, res, err)
 
	getall: (req, res) =>
		db.collection "departments", (err, collection) ->
			console.log err	if err	 
			re.send err if err
			collection.find().toArray (err, docs) ->
				res.send docs
  
	get: (req, res) =>
		db.collection("departments").find {"_id" : req.params.id }, (err, doc) =>
			res.send err if err
			res.send doc


	put: (req, res) =>
		entity = {}
		@modelBind entity, req
		db.collection("departments").update { "_id" : entity._id  }, entity, false

	delete: (req, res) =>
		@Model.findById req.params.id, (err, entity) ->
			entity.remove()
			res.send(204)

	modelBind: (entity, req) =>
		entity._id = new dbMan.ObjectID(req.body._id) 
		entity.name = req.body.name
		entity.users = req.body.users

	save: (entity, res, err) -> 
		if err 
			console.log err 
			if err.code = 1101
				res.send("Already exists", 400) 
				return
			res.send("Unable to process request", 500) 
		else
			res.send(entity)		

exports.DepartmentRoutes = DepartmentRoutes
