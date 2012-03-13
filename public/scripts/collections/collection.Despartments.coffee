define (require) ->

	Department = require '../models/Department'

	class Departments extends Backbone.Collection
	  model: Department
	  url: "/ekmHoliCal/api/departments"

	return Departments