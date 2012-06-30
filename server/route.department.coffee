class DepartmentRoutes

	constructor: ->
		Schemas = require './schemas'
		@Model = new Schemas.DepartmentSchemaBuilder().Model

	post: (req, res) =>
		entity = new @Model
		@modelBind(entity, req)
		entity.save (err) =>
			@save(entity, res, err)
 
	getall: (req, res) =>
		@Model
			.find()
			.populate('users')
			.run (err, entity) ->
				res.send(entity)
 
	get: (req, res) =>
		console.log "req.params.id: " + req.params.id + "req.body.id: " + req.body.id
		@Model.findById req.params.id, (err, entity) ->
			res.send(entity)

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
