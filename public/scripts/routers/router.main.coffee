define (require) ->

  MainView = require '../../scripts/views/view.main.js'

  AdminLayoutView = require '../../scripts/views/view.admin.layout.js'
  AdminNavigationView = require '../../scripts/views/view.admin.navigation.menu.js'

  class MainRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "": "home",
      "admin": "admin",

  class MainController 

    home: ->
      mainView = new MainView
      app.mainRegion.show(mainView)       

    admin: ->
      # app.vent.trigger "main:admin:users"
      @adminLayoutView = new AdminLayoutView
      @adminLayoutView.render()
      app.mainRegion.show(@adminLayoutView)
      @adminLayoutView.navigationRegion.show(new AdminNavigationView)

  MainRouter: MainRouter
  MainController: MainController