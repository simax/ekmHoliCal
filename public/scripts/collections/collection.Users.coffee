define (require) ->

	User = require '../models/User'

	class Users extends Backbone.Collection
	  model: User 
	  url: "/ekmHoliCal/api/users"

	return Users