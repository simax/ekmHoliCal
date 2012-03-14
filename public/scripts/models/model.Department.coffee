define (require) ->
	
	Utils = require 'scripts/Utils.js' 

	class Department extends Backbone.Model
		idAttribute: "_id"
		validation: 
			name:
				required: true
				msg: 'A department name is required'
		
		initialize: ->				
			@on 'validated', (isValid, model, attrs) ->
				Utils.showValidationErrors()

	Department 
