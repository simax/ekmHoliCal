define (require) ->

  User = require '../../scripts/models/model.user.js'

  class app.Users extends Backbone.Collection
    model: User 
    url: "/ekmHoliCal/api/users"
