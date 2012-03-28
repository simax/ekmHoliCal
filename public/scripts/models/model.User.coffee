define (require) ->
	
	Utils = require '../../scripts/Utils.js' 

	class User extends Backbone.Model
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
		
		initialize: ->				
			@on 'validated', (isValid, model, attrs) ->
				Utils.showValidationErrors()
