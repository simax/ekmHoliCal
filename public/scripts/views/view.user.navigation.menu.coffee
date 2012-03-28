define (require) ->

  class UserNavigationView extends Backbone.Marionette.ItemView
    className: "row" 

    initialize: ->
      @template = require '../../scripts/text!user_navigation.html'
      return	

    events:
      "click #create": "create"

    create: (e) ->
      e.preventDefault()
      app.vent.trigger "admin:users:create"
