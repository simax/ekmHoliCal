define (require) ->

  require 'text!../../templates/tmpl.users.layout.html'

	class UsersLayoutView extends Backbone.Marionette.CompositeRegion
	  template: "#tmpl-users-layout"

	  regions:
	    navigationRegion: "#user-navigation-region"
	    listRegion: "#user-list-region"

	return UsersLayoutView