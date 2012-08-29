dbMan = require './DbManager.js'
db = dbMan.db

_ = require '../public/scripts/libs/underscore.amd.js'
 
class UserRoutes

	post: (req, res) =>
		entity = new @Model  
		@modelBind(entity, req)
		entity.save (err) =>
			@save(entity, res, err)

 
	getall: (req, res) => 
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


	put: (req, res) =>
		entity = {}
		@modelBind entity, req

		db.collection("departments").find({"users._id" : entity._id}).limit(1).nextObject (err, doc) ->
			return if err
			_.each doc.users, (userdoc) ->
				if userdoc._id.toString() is req.body._id 
					if userdoc.departmentId.toString() isnt entity.departmentId.toString()  
						console.log "User id to move: " + userdoc._id
						console.log "DepartmentId to move to: " + entity.departmentId
						db.collection("departments").update({ "users._id" : entity._id, "$atomic" : "true" }, { $pull: { 'users' : { "_id" : entity._id } } })
						delete entity._id	 
						db.collection("departments").update({ "_id" : entity.departmentId, "$atomic" : "true" }, { $addToSet: { 'users' : entity } })
					else
						console.log "lastname : " + entity.lastname
						db.collection("departments").update { "users._id" : entity.userid }, 
							$set: {
								"users.$.firstname" : entity.firstname, 
								"users.$.lastname" : entity.lastname, 
								"users.$.email" : entity.email, 
								"users.$.enddate" : entity.enddate, 
								"users.$.active" : entity.active, 
								"users.$.departmentId" : entity.departmentId 
							}	
							, false, false


		 
	delete: (req, res) =>
		@Model.findById req.params.id, (err, entity) ->
			entity.remove()
			res.send(204)

	modelBind: (entity, req) =>
		entity._id = new dbMan.ObjectID(req.body._id)
		entity.firstname = req.body.firstname
		entity.lastname = req.body.lastname
		entity.email = req.body.email
		entity.enddate = req.body.enddate
		entity.active = req.body.active
		entity.departmentId = new dbMan.ObjectID(req.body.departmentId)

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
