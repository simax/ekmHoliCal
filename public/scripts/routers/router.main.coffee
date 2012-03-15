define (require) ->

  MainView = require 'scripts/views/view.main.js'
  UsersLayoutView = require 'scripts/views/view.users.layout.js'
  UserNavigationView = require 'scripts/views/view.user.navigation.menu.js'
  UserListView = require 'scripts/views/view.user.list.js'

  Users = require 'scripts/collections/collection.Users'

  class MainRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "": "home",
      "admin/users": "admin"
      "admin/departments": "departments"

  class MainController 
    home: () ->
      mainView = new MainView
      app.mainRegion.show(mainView)       

    admin: () ->
      usersLayoutView = new UsersLayoutView
      app.mainRegion.show(usersLayoutView)      

      usersLayoutView.navigationRegion.show(new UserNavigationView)

      users = new Users()  
      users.fetch()
      userListView = new UserListView
        collection: users

      usersLayoutView.listRegion.show(userListView)

  MainRouter: MainRouter
  MainController: MainController