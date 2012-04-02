define (require) ->

  Users = require '../../scripts/collections/collection.users.js'
  User = require '../../scripts/models/model.user.js'
  Departments = require '../../scripts/collections/collection.departments.js'

  UserMaintenanceView = require '../../scripts/views/view.user.maintenance.js'
  
  class UserRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/users/create": "adminUsersCreate"
      "admin/users/edit/:id": "adminUsersEdit"

  class UserController 
    initialize: =>
      @users = new Users()
      @users.fetch()
      @departments = new Departments()
      @departments.fetch()

    adminUsersCreate: =>
      @model = new User(departments: @departments)
      userMaintenanceView = new UserMaintenanceView
        collection: @users
        model: @model

      app.mainRegion.show(userMaintenanceView)

    adminUsersEdit: (id) =>
      @model = users.get(id)
      @model.departments = @departments
      userMaintenanceView = new UserMaintenanceView
        collection: @users
        model: @model

      app.mainRegion.show(userMaintenanceView)

  UserRouter: UserRouter
  UserController: UserController
