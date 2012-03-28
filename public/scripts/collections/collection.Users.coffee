define (require) ->

	User = require '../../scripts/models/model.user.js'

	class Users extends Backbone.Collection
	  model: User 
	  url: "/ekmHoliCal/api/users"

