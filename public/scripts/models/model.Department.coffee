define (require) ->
	
	Utils = require '../../scripts/Utils.js' 

	class Department extends Backbone.RelationalModel
		
		initialize: =>				
			@on 'validated', (isValid, model, attrs) ->
				Utils.showValidationErrors()

		urlRoot: '/ekmHoliCal/api/departments/'	

		idAttribute: "_id"
		validation: 
			name:
				required: true
				msg: 'A department name is required'
		
		relations: [
			type:	Backbone.HasOne
			key:	'user'
			relatedModel: 'User'
			includeInJSON: '_id'
		]	

	# new Department