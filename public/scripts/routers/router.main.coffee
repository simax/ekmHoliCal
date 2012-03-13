define (require) ->

  MainView = require '../../views/view.main.coffee'
  UsersLayoutView = require '../../views/view.users.layout.coffee'
  UserNavigationView = require '../../views/view.user.navigation.menu'
  UserListView = require '../../views/view.user.list.menu'

  Users = require '../../collections/collection.Users'

  class MainRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "": "home",
      "admin/users": "admin"
      "admin/departments": "departments"

  class MainController 
    home: () ->
      mainView = new MainView
      @mainRegion.show(mainView)       

    admin: () ->
      usersLayoutView = new UsersLayoutView
      @mainRegion.show(usersLayoutView)      

      usersLayoutView.navigationRegion.show(new UserNavigationView)

      users = new Users()  
      users.fetch()
      userListView = new UserListView
        collection: users

      usersLayoutView.listRegion.show(userListView)

  MainRouter: MainRouter
  MainController: MainController