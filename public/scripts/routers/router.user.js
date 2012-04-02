(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Departments, User, UserController, UserMaintenanceView, UserRouter, Users;
    Users = require('../../scripts/collections/collection.users.js');
    User = require('../../scripts/models/model.user.js');
    Departments = require('../../scripts/collections/collection.departments.js');
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

      function UserController() {
        this.adminUsersEdit = __bind(this.adminUsersEdit, this);
        this.adminUsersCreate = __bind(this.adminUsersCreate, this);
        this.initialize = __bind(this.initialize, this);
      }

      UserController.prototype.initialize = function() {
        this.users = new Users();
        this.users.fetch();
        this.departments = new Departments();
        return this.departments.fetch();
      };

      UserController.prototype.adminUsersCreate = function() {
        var userMaintenanceView;
        this.model = new User({
          departments: this.departments
        });
        userMaintenanceView = new UserMaintenanceView({
          collection: this.users,
          model: this.model
        });
        return app.mainRegion.show(userMaintenanceView);
      };

      UserController.prototype.adminUsersEdit = function(id) {
        var userMaintenanceView;
        this.model = users.get(id);
        this.model.departments = this.departments;
        userMaintenanceView = new UserMaintenanceView({
          collection: this.users,
          model: this.model
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
