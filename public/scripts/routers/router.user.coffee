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
      fetchData = @fetchViewData
      fetchData().done =>
        @model = new User()
        userMaintenanceView = new UserMaintenanceView
          model: @model
        app.mainRegion.show(userMaintenanceView)

    adminUsersEdit: (id) =>
      fetchData = @fetchViewData
      fetchData().done =>
        @model = @users.get(id)
        userMaintenanceView = new UserMaintenanceView
          model: @model
        app.mainRegion.show(userMaintenanceView)

    fetchViewData: =>
      dfd = $.Deferred()
      Users = require '../../scripts/collections/collection.users.js'
      @users = new Users()
      @users.fetch
        success: =>
          dfd.resolve()
        error: =>
          dfd.reject()      
      
      dfd.promise()

  UserRouter: UserRouter
  UserController: UserController
