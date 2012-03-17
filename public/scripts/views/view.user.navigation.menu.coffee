define (require) ->

  require 'text!../../templates/tmpl.user.navigation.html'

	class UserNavigationView extends Backbone.Marionette.ItemView
	  template: "#tmpl-user-navigation"
	  className: "row" 

	  events:
	    "click #create": "create"

	  create: (e) ->
	    e.preventDefault()
	    app.vent.trigger "admin:users:create"
	      
	UserNavigationView