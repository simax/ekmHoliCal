dbMan = require './DbManager'


class DepartmentRoutes
  
	post: (req, res) =>
		# @modelBind(entity, req)
		# console.log "req.body.name: " + req.body.name
		entity.save (err) =>
			@save(entity, res, err)
 
	getall: (req, res) =>
		# server.db.open (err, db) ->
		# 	console.log err if err
		# 	console.log "db:" + db	
		# db = global.dbmanager.getDb()
		dbMan.db.collection "departments", (err, collection) ->
			console.log err	if err	 
			re.send err if err
			collection.find().toArray (err, docs) ->
				res.send docs
  
	get: (req, res) =>
		# console.log "req.params.id: " + req.params.id + "req.body.id: " + req.body.id
		# @Model.findById req.params.id, (err, entity) ->
		# 	res.send(entity)
		
		dbMan.db.collection("departments").find {"_id" : req.params.id }, (err, doc) =>
			res.send err if err
			res.send doc


	put: (req, res) =>
		# entity = db.collection("departments").find({"_id" : req.body.id }).limit(1)
		entity = {}
		@modelBind entity, req
		# console.log "id:" + req.body._id
		# console.log "name:" + req.body.name
		dbMan.db.collection("departments").update { "_id" : entity._id  }, entity, false

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
