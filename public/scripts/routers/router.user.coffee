define (require) ->

  AdminLayoutView = require '../../scripts/views/view.admin.layout.js'
  AdminNavigationView = require '../../scripts/views/view.admin.navigation.menu.js'

  UsersLayoutView = require '../../scripts/views/view.users.layout.js'
  UserNavigationView = require '../../scripts/views/view.user.navigation.menu.js'
  UserListView = require '../../scripts/views/view.user.list.js'

  Users = require '../../scripts/collections/collection.users.js'
  User = require '../../scripts/models/model.user.js'
  Departments = require '../../scripts/collections/collection.departments.js'
  Department = require '../../scripts/models/model.department.js'

  UserMaintenanceView = require '../../scripts/views/view.user.maintenance.js'

  window.app = new Backbone.Marionette.Application() unless window.app?

  class app.UserRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/users": "adminUsers"
      "admin/users/create": "adminUsersCreate"
      "admin/users/edit/:id": "adminUsersEdit"

  class app.UserController 

    setupLayout: =>
      @adminLayoutView = new AdminLayoutView
      @adminLayoutView.render()
      app.mainRegion.show(@adminLayoutView)

    showAdminLayout: =>
      @setupLayout()
      @adminLayoutView.navigationRegion.show(new AdminNavigationView)

    adminUsers: =>
      @showAdminLayout()
      usersLayoutView = new UsersLayoutView
      usersLayoutView.render()
      @adminLayoutView.contentRegion.show(usersLayoutView)      

      usersLayoutView.navigationRegion.show(new UserNavigationView)

      @usersInDepartments = new Departments()  
      @usersInDepartments.fetch()
      userListView = new UserListView(collection: @usersInDepartments)

      usersLayoutView.listRegion.show(userListView)
      # userCompositeView = new UserCompositeView(model: collection: @users)
      # usersLayoutView.listRegion.show(userCompositeView)


    adminUsersCreate: =>
      model = new User()
      deps = new Departments()
      model.set departments: deps
      deps.fetch()
      
      userMaintenanceView = new UserMaintenanceView
        model: model
        viewModel: kb.viewModel(model)

      @setupLayout()
      @adminLayoutView.contentRegion.show(userMaintenanceView)      

    adminUsersEdit: (id) =>
      if @users?  
        model = @users.get(id) 
        @editUser(id)
      else 
        @users = new Users()
        @users.fetch
          success: =>
            @editUser(id)

    editUser: (id) =>
      model = @users.get(id) 
      deps = new Departments()
      model.set departments: deps
      deps.fetch()

      userMaintenanceView = new UserMaintenanceView
        model: model
        viewModel: kb.viewModel(model)

      @setupLayout()  
      @adminLayoutView.contentRegion.show(userMaintenanceView)      
        

  UserRouter: app.UserRouter
  UserController: app.UserController
