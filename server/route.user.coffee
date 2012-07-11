class UserRoutes

	constructor: ->
		# @Schemas = require './schemas'
		# @DepartmentModel = new @Schemas.DepartmentSchemaBuilder().Model
		# @Model = new @Schemas.UserSchemaBuilder().Model

		# @mongo = require("mongodb")
		# @Db = @mongo.Db
		# @Connection = @mongo.Connection
		# @Server = @mongo.Server

		# @server = new @Server 'localhost', 8120
		# @db = new @Db 'ekmHoliCal', @server


	put: (req, res) =>
		@Model.findById req.params.id, (err, entity) =>
			@modelBind entity, req
			entity.save (err) =>
				@save(entity, res, err)

	post: (req, res) =>
		entity = new @Model  
		@modelBind(entity, req)
		entity.save (err) =>
			@save(entity, res, err)
 
	getall: (req, res) => 
		# @Model 
		# 	.find() 
		# 	.run (err, entity) ->
		# 		res.send(entity)
 		# @db.open (err, db) ->
			# console.log err if err
			# console.log "db:" + db		
		db = global.dbmanager.getDb()
		db.collection "departments", (err, collection) ->
			console.log err	if err	
			re.send err if err
			collection.find().toArray (err, docs) ->
				res.send docs


	get: (req, res) => 
		@Model
		.findById(req.params.id)
		.run (err, entity) ->
			res.send(entity)
				
	delete: (req, res) =>
		@Model.findById req.params.id, (err, entity) ->
			entity.remove()
			res.send(204)

	modelBind: (entity, req) =>
		entity.firstname = req.body.firstname
		entity.lastname = req.body.lastname
		entity.email = req.body.email
		entity.enddate = req.body.enddate
		entity.active = req.body.active
		entity.departmentId = req.body.departmentId

	save: (entity, res, err) -> 
		if err 
			console.log err 
			if err.code = 1101
				res.send("Unable to save", 400) 
				return
			res.send("Unable to process request", 500) 
		else
			res.send(entity)	

exports.UserRoutes = UserRoutes
