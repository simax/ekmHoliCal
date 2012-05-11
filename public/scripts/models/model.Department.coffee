define (require) ->
	
	Utils = require '../../scripts/Utils.js' 

	class Department extends Backbone.RelationalModel
		# url: =>
		# 	if @id then '/ekmHoliCal/api/departments/' + @id else '/ekmHoliCal/api/departments'

		urlRoot: '/ekmHoliCal/api/departments/'	

		idAttribute: "_id"
		validation: 
			name:
				required: true
				msg: 'A department name is required'
		
		initialize: =>				
			@on 'validated', (isValid, model, attrs) ->
				Utils.showValidationErrors()
