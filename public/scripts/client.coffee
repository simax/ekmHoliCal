
$ ->
 
  app.bind "initialize:before", (options) ->
    Backbone.Marionette.ItemView.prototype.renderTemplate = (template, data) -> template.tmpl(data) # Handlebars.compile(template)(data)

  app.addInitializer () ->
    mainNavMenuView = new app.MainNavigationMenuView()
    app.mainNavigationMenuRegion.show(mainNavMenuView)

    app.mainRouter = new app.MainRouter
      controller: app.MainController
    
    app.userRouter = new app.UserRouter
      controller: app.UserController  

  app.bind "initialize:after", () ->
    # Backbone.Validation.configure
    #   selector: 'id'

    if Backbone.history
      Backbone.history.start()

  app.MainRouter = Backbone.Marionette.AppRouter.extend
    appRoutes: 
      "": "home",
      "admin": "admin"

  app.UserRouter = Backbone.Marionette.AppRouter.extend
    appRoutes: 
      "admin/create": "adminCreate"
      "admin/edit/:id": "adminEdit"

  app.UserController = 
    adminCreate: () ->
      userMaintenanceView = new app.UserMaintenanceView
        collection: app.users
        model: new app.User()

      app.mainRegion.show(userMaintenanceView)

    adminEdit: (id) ->
      userMaintenanceView = new app.UserMaintenanceView
        collection: app.users
        model: app.users.get(id)

      app.mainRegion.show(userMaintenanceView)

  app.MainController = 
    home: () ->
      mainView = new app.MainView
      app.mainRegion.show(mainView)       

    admin: () ->
      usersLayoutView = new app.UsersLayoutView
      app.mainRegion.show(usersLayoutView)      

      usersLayoutView.navigationRegion.show(new app.UserNavigationView)

      app.users.fetch()
      userListView = new app.UserListView
        collection: app.users

      usersLayoutView.listRegion.show(userListView)
        
  app.addRegions
    mainNavigationMenuRegion: "#main-navigation-menu",
    mainRegion: "#main-region"
  
        
  app.vent.on "main:home", () -> app.mainRouter.navigate("", true)
  app.vent.on "main:admin", () -> app.mainRouter.navigate("admin", true)

  app.vent.on "admin:create", () -> app.userRouter.navigate("admin/create", true)
  app.vent.on "admin:edit", (id) -> app.userRouter.navigate("admin/edit/" + id, true)
    
  app.start()

