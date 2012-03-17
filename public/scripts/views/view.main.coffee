define (require) ->

  Backbone = require 'backbone'
  require 'marionette'

  require 'text!../../templates/tmpl.main.region.html'

  class MainView extends Backbone.Marionette.ItemView
    template: "#tmpl-main-region"

  MainView  
