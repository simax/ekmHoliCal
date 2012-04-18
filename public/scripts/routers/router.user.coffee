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
      model = new User()
      userMaintenanceView = new UserMaintenanceView
        model: model
      app.mainRegion.show(userMaintenanceView)

    adminUsersEdit: (id) =>
      console.log "adminUsersEdit"
      app.data.users = new Users()
      app.data.users.fetch
        success: (collection, response)=>
          model = collection.get(id)
          userMaintenanceView = new UserMaintenanceView
            model: model
          app.mainRegion.show(userMaintenanceView)
      
        
  UserRouter: UserRouter
  UserController: UserController
