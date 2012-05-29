define (require) ->

	Utils = require '../../scripts/Utils.js' 
	window.app = new Backbone.Marionette.Application() unless window.app?

	require '../../scripts/models/model.Department.js'

	class User extends Backbone.RelationalModel

		initialize: =>				
			@on 'validated', (isValid, model, attrs) -> Utils.showValidationErrors()
	    
		defaults:
			department: ""
			firstname: ""
			lastname: ""
			email: ""
			active: true
			enddate: ""

		urlRoot: '/ekmHoliCal/api/users/'
		idAttribute: "_id"

		validation: 
			firstname:
				required: true
				msg: 'A first name is required'
			lastname:
				required: true
				msg: 'A last name is required'
			email:
				required: true
				pattern: 'email'
				msg: 'A valid email address is required'
			department:
				required: true
				msg: 'A department is required'

		relations: [
			type:	Backbone.HasOne
			key:	'department'
			relatedModel: 'app.Department'
			includeInJSON: "_id"
			reverseRelation:
				type: Backbone.HasOne
				key: 'user'			
		]	

	app.User = User
	app.User.setup()
	return app.User