define (require) ->

  Users = require '../../scripts/collections/collection.users.js'
  User = require '../../scripts/models/model.user.js'

  users = new Users()
  users.fetch()

  Departments = require '../../scripts/collections/collection.departments.js'
  departments = new Departments()
  departments.fetch()

  UserMaintenanceView = require '../../scripts/views/view.user.maintenance.js'
  
  class UserRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/users/create": "adminUsersCreate"
      "admin/users/edit/:id": "adminUsersEdit"

  class UserController 
    adminUsersCreate: () ->
      userMaintenanceView = new UserMaintenanceView
        collection: users
        model: new User(departments: departments)

      app.mainRegion.show(userMaintenanceView)

    adminUsersEdit: (id) ->
      userMaintenanceView = new UserMaintenanceView
        collection: users
        model: users.get(id)
        departments: departments

      app.mainRegion.show(userMaintenanceView)

  UserRouter: UserRouter
  UserController: UserController
