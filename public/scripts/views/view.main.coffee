define () ->
	
  require 'text!../../templates/tmpl.main.region.html'

	class MainView extends Backbone.Marionette.ItemView
	  template: "#tmpl-main-region"

	return MainView  
