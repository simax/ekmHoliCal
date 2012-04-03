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

    adminUsersCreate: =>
      @model = new User(departments: app.departments.toJSON())
      userMaintenanceView = new UserMaintenanceView
        model: @model

      app.mainRegion.show(userMaintenanceView)

    adminUsersEdit: (id) =>
      @model = app.users.get(id)
      @model.attributes.departments = app.departments.toJSON()
      userMaintenanceView = new UserMaintenanceView
        # collection: @users
        model: @model

      app.mainRegion.show(userMaintenanceView)

  UserRouter: UserRouter
  UserController: UserController
