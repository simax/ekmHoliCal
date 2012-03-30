define (require) ->
	
	Utils = require '../../scripts/Utils.js' 

	class User extends Backbone.Model
		initialize: =>
	    @departments = @options.departments
	    
		url: =>
			if @id then '/ekmHoliCal/api/users/' + @id else '/ekmHoliCal/api/users'

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
			departmentId:
				required: true
				msg: 'A department is required'
		
		initialize: ->				
			@on 'validated', (isValid, model, attrs) ->
				Utils.showValidationErrors()
