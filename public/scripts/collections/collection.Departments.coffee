define (require) ->

  Department = require '../../scripts/models/model.department.js'

  class Departments extends Backbone.Collection
    model: Department
    url: "/ekmHoliCal/api/departments"

    parse: (resp, xhr) ->
      for deps in resp
        for user in deps.users 
          user.id = user._id
      resp    
