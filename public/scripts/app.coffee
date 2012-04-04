define (require) ->
  
  routeMain = require '../scripts/routers/router.main.js'
  routeUser = require '../scripts/routers/router.user.js'
  routeDepartment = require '../scripts/routers/router.department.js'


  MainNavigationMenuView = require '../scripts/views/view.main.navigation'

  class Application extends Backbone.Marionette.Application

  window.app = if not window.app then new Application() else window.app        

  app.bind "initialize:before", (options) ->
    Backbone.Marionette.ItemView.prototype.renderTemplate = (template, data) -> Handlebars.compile(template.html())(data) # (template, data) -> template.tmpl(data) 

  app.addInitializer () ->
    mainNavMenuView = new MainNavigationMenuView()
    app.mainNavigationMenuRegion.show(mainNavMenuView)

    app.mainRouter = new routeMain.MainRouter(controller: new routeMain.MainController)
    app.userRouter = new routeUser.UserRouter(controller: new routeUser.UserController)  
    app.departmentRouter = new routeDepartment.DepartmentRouter(controller: new routeDepartment.DepartmentController)  

  app.bind "initialize:after", () ->
    if Backbone.history
      Backbone.history.start()

  app.addRegions 
    mainNavigationMenuRegion: "#main-navigation-menu",
    mainRegion: "#main-region"

  app.vent.on "main:home", () -> app.mainRouter.navigate("", true)
  app.vent.on "main:admin", () -> app.mainRouter.navigate("admin", true)
  app.vent.on "main:admin:users", () -> app.userRouter.navigate("admin/users", true)

  app.vent.on "main:admin:departments", () -> app.departmentRouter.navigate("admin/departments", true)

  app.vent.on "admin:users:create", () -> app.userRouter.navigate("admin/users/create", true)
  
  app.vent.on "admin:users:edit", (id) -> 
    new routeUser.UserController().adminUsersEdit(id)
    app.userRouter.navigate("admin/users/edit/" + id, false)

  app.vent.on "admin:departments:create", () -> app.departmentRouter.navigate("admin/departments/create", true)
  app.vent.on "admin:departments:edit", (id) -> app.departmentRouter.navigate("admin/departments/edit/" + id, true)


  app.start()    
