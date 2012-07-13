define (require) ->
  
  routeMain = require '../scripts/routers/router.main.js'
  routeUser = require '../scripts/routers/router.user.js'
  routeDepartment = require '../scripts/routers/router.department.js'

  MainNavigationMenuView = require '../scripts/views/view.main.navigation'


  window.app = if not window.app then new Backbone.Marionette.Application() else window.app        

  Array::remove = (e) -> @[t..t] = [] if (t = @indexOf(e)) > -1

  app.bind "initialize:before", (options) ->
    Backbone.Marionette.TemplateCache.loadTemplate = 
        (template, callback) => 
          compiledTemplate = Handlebars.compile($(template).html()) 
          callback.call(@, compiledTemplate)

    Backbone.Marionette.Renderer.render = (template, data) ->
      Handlebars.compile($(template).html()) data 

  app.addInitializer () ->
    app.data = {}
    mainNavMenuView = new MainNavigationMenuView()
    app.mainNavigationMenuRegion.show(mainNavMenuView)

    app.mainRouter = new routeMain.MainRouter(controller: new routeMain.MainController)
    app.userRouter = new routeUser.UserRouter(controller: new routeUser.UserController)  
    app.departmentRouter = new routeDepartment.DepartmentRouter(controller: new routeDepartment.DepartmentController)  

  app.bind "initialize:after", () ->
    Backbone.history.start() if Backbone.history

  app.addRegions 
    mainNavigationMenuRegion: "#main-navigation-menu",
    mainRegion: "#main-content-region"

  app.vent.on "main:home", () -> app.mainRouter.navigate("", true)
  app.vent.on "main:admin", () -> app.mainRouter.navigate("admin", true)

  app.vent.on "main:admin:users", () -> app.userRouter.navigate("admin/users", true)
  app.vent.on "main:admin:departments", () -> app.departmentRouter.navigate("admin/departments", true)

  app.start()    
