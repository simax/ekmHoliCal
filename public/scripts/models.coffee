
class User extends Backbone.Model
	idAttribute: "_id"
	validation: 
		firstname:
			required: true
			msg: 'Firstname is required'
		lastname:
			required: true
			msg: 'Lastname is required'
		email:
			required: true
			pattern: 'email'
			msg: 'A valid email address is required'
					

@app = window.app ? new Backbone.Marionette.Application()
@app.User = User 
