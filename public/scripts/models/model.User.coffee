define (require) ->

	Utils = require '../../scripts/Utils.js' 

	require '../../scripts/models/model.Department.js'

	class User extends Backbone.Model

		initialize: =>				
			@on 'validated', (isValid, model, attrs) -> Utils.showValidationErrors()

		defaults:
			firstname: ""
			lastname: ""
			email: ""
			active: true
			enddate: ""
			departmentId: ""

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
			departmentId:
				required: true
				msg: 'A department is required'

	