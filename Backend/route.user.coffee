class UserRoutes

	constructor: ->
		@Schemas = require './schemas'
		@DepartmentModel = new @Schemas.DepartmentSchemaBuilder().Model
		@Model = new @Schemas.UserSchemaBuilder().Model

	post: (req, res) =>
		entity = new @Model
		# @modelBind(entity, req)
		# entity.save (err) =>
		# 	@save(entity, res, err)
		@DepartmentModel
		.findById(req.body.departmentId)
		.run (err, dept) =>
			entity.firstname = req.body.firstname
			entity.lastname = req.body.lastname
			entity.email = req.body.email
			entity.department = dept
			entity.startdate = req.body.startdate
			entity.enddate = ""
			entity.active = req.body.active
			entity.save (err) =>
				@save(entity, res, err)

	getall: (req, res) =>
		res.contentType 'application/json' 
		@Model
			.find()
			# .populate('department')
			.run (err, entity) ->
				# console.log "Department name: " + entity.department
				res.send(entity)

	get: (req, res) =>
		@Model
		.findById(req.params.id)
		# .populate('department')
		.run (err, entity) ->
			console.log entity
			# console.log "entity.department.name: " + entity.department.name
			console.log err 
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
		@DepartmentModel
			.findById(req.body.departmentId)
			.run (err, dept) =>
				entity.firstname = req.body.firstname
				entity.lastname = req.body.lastname
				entity.email = req.body.email
				entity.department = dept
				entity.startdate = req.body.startdate
				entity.enddate = ""
				entity.active = req.body.active

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
