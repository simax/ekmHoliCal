db = require './DbManager.js'

class DepartmentRoutes

	constructor: ->
		
		# Schemas = require './schemas'
		# @Model = new Schemas.DepartmentSchemaBuilder().Model

		# @mongo = require("mongodb")
		# @Db = @mongo.Db
		# @Connection = @mongo.Connection
		# @Server = @mongo.Server

		# @server = new @Server 'localhost', 8120
		# @db = new @Db 'ekmHoliCal', @server
		# @db.open (err, db) ->
		# 	console.log err if err
		# 	console.log "db:" + db	

	post: (req, res) =>
		entity = new @Model
		@modelBind(entity, req)
		entity.save (err) =>
			@save(entity, res, err)
 
	getall: (req, res) =>
		# server.db.open (err, db) ->
		# 	console.log err if err
		# 	console.log "db:" + db	
		# db = global.dbmanager.getDb()
		db.collection "departments", (err, collection) ->
			console.log err	if err	
			re.send err if err
			collection.find().toArray (err, docs) ->
				res.send docs

	get: (req, res) =>
		# console.log "req.params.id: " + req.params.id + "req.body.id: " + req.body.id
		# @Model.findById req.params.id, (err, entity) ->
		# 	res.send(entity)
		
		db.collection("departments").findOne {"_id" : req.params.id }, (err, doc) =>
			res.send err if err
			res.send doc


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
		entity.name = req.body.name

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
