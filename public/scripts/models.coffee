class User extends Backbone.Model
	toClient: ->
		obj = @
		obj.id = @.attributes._id
		delete obj._id
		obj		

@app = window.app ? {}
@app.User = User 