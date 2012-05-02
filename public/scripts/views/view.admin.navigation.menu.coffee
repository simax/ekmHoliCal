define (require) ->

  class AdminNavigationView extends Backbone.Marionette.ItemView
    className: "row" 

    initialize: ->
      @template = require '../../scripts/text!admin_navigation.html'

    events:
      "click #create": "create"

    create: (e) ->
      e.preventDefault()
      app.vent.trigger "admin:users:create"
