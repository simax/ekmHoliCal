(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var User, UserController, UserMaintenanceView, UserRouter, Users, users;
    Users = require('../../scripts/collections/collection.users.js');
    User = require('../../scripts/models/model.user.js');
    users = new Users();
    users.fetch();
    UserMaintenanceView = require('../../scripts/views/view.user.maintenance.js');
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
    UserController = (function() {

      function UserController() {}

      UserController.prototype.adminUsersCreate = function() {
        var userMaintenanceView;
        userMaintenanceView = new UserMaintenanceView({
          collection: users,
          model: new User()
        });
        return app.mainRegion.show(userMaintenanceView);
      };

      UserController.prototype.adminUsersEdit = function(id) {
        var userMaintenanceView;
        userMaintenanceView = new UserMaintenanceView({
          collection: users,
          model: users.get(id)
        });
        return app.mainRegion.show(userMaintenanceView);
      };

      return UserController;

    })();
    return {
      UserRouter: UserRouter,
      UserController: UserController
    };
  });

}).call(this);
