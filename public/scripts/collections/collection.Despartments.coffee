define (require) ->

	Department = require '../../scripts/models/department.js'

	class Departments extends Backbone.Collection
	  model: Department
	  url: "/ekmHoliCal/api/departments"

	Departments