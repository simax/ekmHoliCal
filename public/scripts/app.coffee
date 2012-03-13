define (require) ->

    User = require '../models/model.user'
    Users = require '../models/model.users'

    Department = require '../models/model.department'
    Departments = require '../models/model.departments'

    MainNavigationMenuView = require '../views/view.main.navigation'

    routeMain = require '../routers/routers.main.coffee'
    routeUser = require '../routers/routers.user.coffee'
    routeDepartment = require '../routers/routers.department.coffee'

    require "text!../templates/tmpl.main.navigation.html"


    class App extends Backbone.Marionette.Application()
      initialize: =>
        @bind "initialize:before", (options) ->
          Backbone.Marionette.ItemView.prototype.renderTemplate = (template, data) -> template.tmpl(data) # Handlebars.compile(template)(data)

        @addInitializer () ->
          mainNavMenuView = new MainNavigationMenuView()
          @mainNavigationMenuRegion.show(mainNavMenuView)

          @mainRouter = new routeMain.MainRouter(controller: routeMain.MainController)
          @userRouter = new routeUser.UserRouter(controller: routeUser.UserController)  
          @departmentRouter = new routeDepartment.DepartmentRouter(controller: routeDepartment.DepartmentController)  

        @bind "initialize:after", () ->
          if Backbone.history
            Backbone.history.start()

        @addRegions 
          mainNavigationMenuRegion: "#main-navigation-menu",
          mainRegion: "#main-region"

        @vent.on "main:home", () -> @mainRouter.navigate("", true)
        # @vent.on "main:admin", () -> @mainRouter.navigate("admin", true)
        @vent.on "main:admin:users", () -> @userRouter.navigate("admin/users", true)

        @vent.on "admin:users:create", () -> @userRouter.navigate("admin/users/create", true)
        @vent.on "admin:users:edit", (id) -> @userRouter.navigate("admin/users/edit/" + id, true)

        @vent.on "admin:departments:create", () -> @userRouter.navigate("admin/departments/create", true)
        @vent.on "admin:departments:edit", (id) -> @userRouter.navigate("admin/departments/edit/" + id, true)

return App