
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
    if Backbone.history
      Backbone.history.start()

  app.MainRouter = Backbone.Marionette.AppRouter.extend
    appRoutes: 
      "": "home",
      "admin": "admin"

  app.UserRouter = Backbone.Marionette.AppRouter.extend
    appRoutes: 
      "admin/create": "adminCreate"

  app.UserController = 
    adminCreate: () ->
      userCreateView = new app.UserCreateView
        collection: app.users
        model: new app.User()

      app.mainRegion.show(userCreateView)

  app.MainController = 
    home: () ->
      mainView = new app.MainView
      app.mainRegion.show(mainView)      

    admin: () ->
      app.users.fetch()
      usersLayoutView = new app.UsersLayoutView
      app.mainRegion.show(usersLayoutView)

  app.addRegions
    mainNavigationMenuRegion: "#main-navigation-menu",
    mainRegion: "#main-region"
  
  app.vent.bind "main:home", (message) -> Backbone.history.navigate("", true)
  app.vent.bind "main:admin", (message) -> Backbone.history.navigate("admin", true)

  app.vent.bind "admin:create", (message) -> Backbone.history.navigate("admin/create", true)
    
  app.start()
