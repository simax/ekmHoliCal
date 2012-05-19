define (require) ->
	
	Utils = require '../../scripts/Utils.js' 

	class User extends Backbone.RelationalModel

		initialize: =>				
			@on 'validated', (isValid, model, attrs) -> Utils.showValidationErrors()
	    
		# url: =>
		# 	if @id then '/ekmHoliCal/api/users/' + @id else '/ekmHoliCal/api/users'

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
			relatedModel: 'Department'
			includeInJSON: '_id'
			reverseRelation:
				type: Backbone.HasOne
				key: 'user'			
		]	

	User.setup()
	User
