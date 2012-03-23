define (require) ->
  
  Backbone = require 'backbone'
  routeMain = require '../scripts/routers/router.main.js'
  routeUser = require '../scripts/routers/router.user.js'
  # routeDepartment = require '../scripts/routers/router.department.js'

  MainNavigationMenuView = require '../scripts/views/view.main.navigation'

  class Application extends Backbone.Marionette.Application
  window.app = if not window.app then new Application() else window.app        

# -------------------
  # Backbone.Marionette.ItemView.prototype.renderTemplate = (template, data) -> template.tmpl(data) # Handlebars.compile(template)(data)

  # app.addRegions 
  #   mainNavigationMenuRegion: "#main-navigation-menu",
  #   mainRegion: "#main-region"

  # mainNavMenuView = new MainNavigationMenuView()
  # app.mainNavigationMenuRegion.show(mainNavMenuView)
# --------------------

  app.bind "initialize:before", (options) ->
    # Backbone.Marionette.TemplateManager.loadTemplate = (templateId, callback) ->
    #   that = this
    #   return if templateId.indexOf("tmpl") != 1
    #   tmpl1 = templateId.replace(/#/g, "")
    #   tmpl = tmpl1.replace(/-/g, ".") + ".html"
    #   $.get tmpl, (template) ->
    #     callback.call this, template
        
    Backbone.Marionette.ItemView.prototype.renderTemplate = (template, data) -> template.tmpl(data) # Handlebars.compile(template)(data)

  app.addInitializer () ->
    mainNavMenuView = new MainNavigationMenuView()
    app.mainNavigationMenuRegion.show(mainNavMenuView)

    app.mainRouter = new routeMain.MainRouter(controller: new routeMain.MainController)
    app.userRouter = new routeUser.UserRouter(controller: new routeUser.UserController)  
    # app.departmentRouter = new routeDepartment.DepartmentRouter(controller: routeDepartment.DepartmentController)  

  app.bind "initialize:after", () ->
    if Backbone.history
      Backbone.history.start()

  app.addRegions 
    mainNavigationMenuRegion: "#main-navigation-menu",
    mainRegion: "#main-region"

  app.vent.on "main:home", () -> app.mainRouter.navigate("", true)
  app.vent.on "main:admin", () -> app.mainRouter.navigate("admin", true)
  app.vent.on "main:admin:users", () -> app.userRouter.navigate("admin/users", true)

  app.vent.on "admin:users:create", () -> app.userRouter.navigate("admin/users/create", true)
  app.vent.on "admin:users:edit", (id) -> app.userRouter.navigate("admin/users/edit/" + id, true)

  app.vent.on "admin:departments:create", () -> app.userRouter.navigate("admin/departments/create", true)
  app.vent.on "admin:departments:edit", (id) -> app.userRouter.navigate("admin/departments/edit/" + id, true)

  app.start()    
  return 
  