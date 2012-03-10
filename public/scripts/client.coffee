
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

    app.departmentRouter = new app.DepartmentRouter
      controller: app.DepartmentController  

  app.bind "initialize:after", () ->
    # Backbone.Validation.configure
    #   selector: 'id'

    if Backbone.history
      Backbone.history.start()

  app.MainRouter = Backbone.Marionette.AppRouter.extend
    appRoutes: 
      "": "home",
      "admin/users": "admin"
      "admin/departments": "departments"

  app.UserRouter = Backbone.Marionette.AppRouter.extend
    appRoutes: 
      "admin/users/create": "adminUsersCreate"
      "admin/users/edit/:id": "adminUsersEdit"

  app.UserController =
    adminUsersCreate: () ->
      userMaintenanceView = new app.UserMaintenanceView
        collection: app.users
        model: new app.User()

      app.mainRegion.show(userMaintenanceView)

    adminUsersEdit: (id) ->
      console.log "id: " + id
      userMaintenanceView = new app.UserMaintenanceView
        collection: app.users
        model: app.users.get(id)

      app.mainRegion.show(userMaintenanceView)

  app.DepartmentRouter = Backbone.Marionette.AppRouter.extend
    appRoutes: 
      "admin/departments/create": "adminDepartmentsCreate"
      "admin/departments/edit/:id": "adminDepartmentsEdit"

  app.DepartmentController = 
    adminDepartmentsCreate: () ->
      userMaintenanceView = new app.DepartmentMaintenanceView
        collection: app.departments
        model: new app.Department()

      app.mainRegion.show(departmentMaintenanceView)

    adminDepartmentsEdit: (id) ->
      console.log "id: " + id
      departmentMaintenanceView = new app.DepartmentMaintenanceView
        collection: app.departments
        model: app.departments.get(id)

      app.mainRegion.show(departmentMaintenanceView)

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
  # app.vent.on "main:admin", () -> app.mainRouter.navigate("admin", true)
  app.vent.on "main:admin:users", () -> app.userRouter.navigate("admin/users", true)

  app.vent.on "admin:users:create", () -> app.userRouter.navigate("admin/users/create", true)
  app.vent.on "admin:users:edit", (id) -> app.userRouter.navigate("admin/users/edit/" + id, true)

  app.vent.on "admin:departments:create", () -> app.userRouter.navigate("admin/departments/create", true)
  app.vent.on "admin:departments:edit", (id) -> app.userRouter.navigate("admin/departments/edit/" + id, true)
    
  app.start()

