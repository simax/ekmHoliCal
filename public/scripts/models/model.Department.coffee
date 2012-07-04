define (require) ->
	
	Utils = require '../../scripts/Utils.js' 

	class Department extends Backbone.Model
		
		defaults:
			name: ""

		initialize: =>				
			@on 'validated', (isValid, model, attrs) -> Utils.showValidationErrors()

		urlRoot: '/ekmHoliCal/api/departments/'	
		idAttribute: "_id"

		validation: 
			name:
				required: true
				msg: 'A department name is required'
