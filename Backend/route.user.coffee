class UserRoutes

	constructor: ->
		@Schemas = require './schemas'
		@DepartmentModel = new @Schemas.DepartmentSchemaBuilder().Model
		@Model = new @Schemas.UserSchemaBuilder().Model

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
		res.contentType 'application/json' 
		@Model
			.find()
			.populate('department')
			.run (err, entity) ->
				# console.log "zzzzzzzzzzzzzzzzzzzzzzzz" 
				res.send(entity)

	get: (req, res) =>
		@Model
		.findById(req.params.id)
		.populate('department')
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
		entity.startdate = req.body.startdate
		entity.enddate = ""
		entity.active = req.body.active
		entity.department = req.body.department
		@DepartmentModel
			.findById(req.body.department.id)
			.run (err, dept) =>
				entity.department = dept

	save: (entity, res, err) -> 
		if err 
			console.log err 
			if err.code = 1101
				res.send("Already exists", 400) 
				return
			res.send("Unable to process request", 500) 
		else
			res.send(entity)	

exports.UserRoutes = UserRoutes
