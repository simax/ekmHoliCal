class User extends Backbone.Model
	idAttribute: "_id"

@app = window.app ? new Backbone.Marionette.Application()
@app.User = User 
   