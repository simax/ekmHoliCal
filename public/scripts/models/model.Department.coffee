define (require) ->
	
	Utils = require '../../scripts/Utils.js' 
	window.app = new Backbone.Marionette.Application() unless window.app?  

	class Department extends Backbone.RelationalModel
		
		defaults:
			_id: ""
			name: ""

		initialize: =>				
			@on 'validated', (isValid, model, attrs) -> Utils.showValidationErrors()

		urlRoot: '/ekmHoliCal/api/departments/'	

		idAttribute: "_id"
		validation: 
			name:
				required: true
				msg: 'A department name is required'


	app.Department = Department
	app.Department.setup()
	return app.Department