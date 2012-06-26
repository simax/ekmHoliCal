_und = require '../public/scripts/libs/underscore.js'

class DepartmentRoutes

	constructor: ->
		@Schemas = require './schemas'
		@Model = new @Schemas.DepartmentSchemaBuilder().Model
		@UserModel = new @Schemas.UserSchemaBuilder().Model

	post: (req, res) =>
		entity = new @Model
		@modelBind(entity, req)
		entity.save (err) =>
			@save(entity, res, err)
 
	getall: (req, res) =>
		res.contentType 'application/json'
		@Model
				.find()
				.populate('users')
				.run (err, entity) ->
					res.send(entity)

		# @UserModel
		# 	.find()		
		# 	.run (err, entity) =>
		# 		@users = entity
		# 		@Model
		# 			.find()
		# 			.run (err, entity) =>
		# 				@deps = _und.map entity, 
		# 					(dept) => 
		# 						@departmentId = dept._id
		# 						@departmentUsers = _und.filter @users, 
		# 							(user) => 
		# 								# console.log user.departmentId.toString() + ":" + @departmentId.toString() #if user.departmentId == @departmentId
		# 								user.departmentId.toString() == @departmentId.toString()
		# 								# user #if user.departmentId == dept._id
		# 						dept.users.push.apply(dept.users, @departmentUsers)
		# 						dept.save()		
		# 				res.send(@deps)


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
