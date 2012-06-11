define (require) ->

  window.app = new Backbone.Marionette.Application() unless window.app?

  class UserNavigationView extends Backbone.Marionette.ItemView
    className: "row" 

    initialize: ->
      @template = require '../../scripts/text!user_navigation.html'
      return	

    events:
      "click #create": "create"

    create: (e) ->
      e.preventDefault()
      new app.UserController().adminUsersCreate()
      Backbone.history.navigate("admin/users/create/")
