(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserController, UserRouter;
    UserRouter = (function(_super) {

      __extends(UserRouter, _super);

      function UserRouter() {
        UserRouter.__super__.constructor.apply(this, arguments);
      }

      UserRouter.prototype.appRoutes = {
        "admin/users/create": "adminUsersCreate",
        "admin/users/edit/:id": "adminUsersEdit"
      };

      return UserRouter;

    })(Backbone.Marionette.AppRouter);
    return UserController = (function() {

      function UserController() {}

      UserController.prototype.adminUsersCreate = function() {
        var userMaintenanceView;
        userMaintenanceView = new this.UserMaintenanceView({
          collection: this.users,
          model: new this.User()
        });
        return this.mainRegion.show(userMaintenanceView);
      };

      UserController.prototype.adminUsersEdit = function(id) {
        var userMaintenanceView;
        console.log("id: " + id);
        userMaintenanceView = new this.UserMaintenanceView({
          collection: this.users,
          model: this.users.get(id)
        });
        return this.mainRegion.show(userMaintenanceView);
      };

      return UserController;

    })();
  });

  ({
    UserRouter: UserRouter,
    UserController: UserController
  });

}).call(this);
