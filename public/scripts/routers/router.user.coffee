define (require) ->
 
    class UserRouter extends Backbone.Marionette.AppRouter
      appRoutes: 
        "admin/users/create": "adminUsersCreate"
        "admin/users/edit/:id": "adminUsersEdit"

    class UserController 
      adminUsersCreate: () ->
        userMaintenanceView = new @UserMaintenanceView
          collection: @users
          model: new @User()

        @mainRegion.show(userMaintenanceView)

      adminUsersEdit: (id) ->
        console.log "id: " + id
        userMaintenanceView = new @UserMaintenanceView
          collection: @users
          model: @users.get(id)

        @mainRegion.show(userMaintenanceView)

UserRouter: UserRouter
UserController: UserController
