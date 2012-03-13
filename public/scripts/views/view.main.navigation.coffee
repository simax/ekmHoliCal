define (require) ->

  require 'text!../../templates/tmpl.main.navigation.menu.html'

  class MainNavigationMenuView extends Backbone.Marionette.ItemView
    template: "#tmpl-main-navigation-menu"
    className: "navbar"

    events:
      "click #main-admin": "adminClick"
      "click #main-home": "homeClick"

    adminClick: (e) ->
      e.preventDefault()
      app.vent.trigger "main:admin:users"

    homeClick: (e) ->
      e.preventDefault()
      app.vent.trigger "main"

  return MainNavigationMenuView