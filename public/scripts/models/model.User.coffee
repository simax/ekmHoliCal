define (require) ->
	
	Utils = require '../../Utils' 

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

			# startdate:
			# 	fn: (value, attr, computedState) ->
			# 		return '' if not value
			# 		pattern = ///
			# 			^([1-9]|0[1-9]|[12][0-9]|3[01])\D([1-9]|0[1-9]|1[012])\D(19[0-9][0-9]|20[0-9][0-9])$
			# 		///
			# 		x=value.match pattern
			# 		return '' if x
			# 		'Invalid date'		 
			# 		# d=Date.parse(value)
			# 		# if (isNaN(d)==false)
			# 		# 	d=new Date(d);
			# 		# 	return ''					
					    
		
		initialize: ->				
			@on 'validated', (isValid, model, attrs) ->
				Utils.showValidationErrors()

return User 