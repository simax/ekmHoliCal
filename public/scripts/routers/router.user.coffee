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


  class UserRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/users": "adminUsers"
      "admin/users/create": "adminUsersCreate"
      "admin/users/edit/:id": "adminUsersEdit"

  class UserController 
    showAdminLayout: =>
      @adminLayoutView = new AdminLayoutView
      @adminLayoutView.render()
      app.mainRegion.show(@adminLayoutView)
      @adminLayoutView.navigationRegion.show(new AdminNavigationView)

    adminUsers: =>
      @showAdminLayout()
      usersLayoutView = new UsersLayoutView
      usersLayoutView.render()
      @adminLayoutView.contentRegion.show(usersLayoutView)      

      usersLayoutView.navigationRegion.show(new UserNavigationView)

      @users = new Users()  
      @users.fetch()
      userListView = new UserListView(collection: @users)
      usersLayoutView.listRegion.show(userListView)
 
    adminUsersCreate: =>
      model = new User()
      userMaintenanceView = new UserMaintenanceView
        model: model
        viewModel: kb.viewModel(model)

      @adminLayoutView.contentRegion.show(userMaintenanceView)      

    adminUsersEdit: (id) =>
      model = @users.get(id)
      userMaintenanceView = new UserMaintenanceView
        model: model
        viewModel: kb.viewModel(model)

      @adminLayoutView.contentRegion.show(userMaintenanceView)      
      
  UserRouter: UserRouter
  UserController: UserController
