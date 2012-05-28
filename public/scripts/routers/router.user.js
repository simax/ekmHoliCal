(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var AdminLayoutView, AdminNavigationView, Department, Departments, User, UserController, UserListView, UserMaintenanceView, UserNavigationView, UserRouter, Users, UsersLayoutView;
    AdminLayoutView = require('../../scripts/views/view.admin.layout.js');
    AdminNavigationView = require('../../scripts/views/view.admin.navigation.menu.js');
    UsersLayoutView = require('../../scripts/views/view.users.layout.js');
    UserNavigationView = require('../../scripts/views/view.user.navigation.menu.js');
    UserListView = require('../../scripts/views/view.user.list.js');
    Users = require('../../scripts/collections/collection.users.js');
    User = require('../../scripts/models/model.user.js');
    Departments = require('../../scripts/collections/collection.departments.js');
    Department = require('../../scripts/models/model.department.js');
    UserMaintenanceView = require('../../scripts/views/view.user.maintenance.js');
    UserRouter = (function(_super) {

      __extends(UserRouter, _super);

      function UserRouter() {
        UserRouter.__super__.constructor.apply(this, arguments);
      }

      UserRouter.prototype.appRoutes = {
        "admin/users": "adminUsers",
        "admin/users/create": "adminUsersCreate",
        "admin/users/edit/:id": "adminUsersEdit"
      };

      return UserRouter;

    })(Backbone.Marionette.AppRouter);
    UserController = (function() {

      function UserController() {
        this.adminUsersEdit = __bind(this.adminUsersEdit, this);
        this.adminUsersCreate = __bind(this.adminUsersCreate, this);
        this.adminUsers = __bind(this.adminUsers, this);
        this.showAdminLayout = __bind(this.showAdminLayout, this);
      }

      UserController.prototype.showAdminLayout = function() {
        this.adminLayoutView = new AdminLayoutView;
        this.adminLayoutView.render();
        app.mainRegion.show(this.adminLayoutView);
        return this.adminLayoutView.navigationRegion.show(new AdminNavigationView);
      };

      UserController.prototype.adminUsers = function() {
        var usersLayoutView,
          _this = this;
        this.showAdminLayout();
        usersLayoutView = new UsersLayoutView;
        usersLayoutView.render();
        this.adminLayoutView.contentRegion.show(usersLayoutView);
        usersLayoutView.navigationRegion.show(new UserNavigationView);
        this.users = new Users();
        return this.users.fetch({
          success: function() {
            var userListView;
            userListView = new UserListView({
              collection: _this.users
            });
            return usersLayoutView.listRegion.show(userListView);
          }
        });
      };

      UserController.prototype.adminUsersCreate = function() {
        var deps, model,
          _this = this;
        model = new User();
        deps = new Departments();
        model.set({
          departments: deps
        });
        return deps.fetch({
          success: function() {
            var userMaintenanceView;
            userMaintenanceView = new UserMaintenanceView({
              model: model,
              viewModel: kb.viewModel(model)
            });
            return _this.adminLayoutView.contentRegion.show(userMaintenanceView);
          }
        });
      };

      UserController.prototype.adminUsersEdit = function(id) {
        var deps, model,
          _this = this;
        model = this.users.get(id);
        deps = new Departments();
        return deps.fetch({
          success: function() {
            var userMaintenanceView;
            model.set({
              departments: deps
            });
            userMaintenanceView = new UserMaintenanceView({
              model: model,
              viewModel: kb.viewModel(model)
            });
            return _this.adminLayoutView.contentRegion.show(userMaintenanceView);
          }
        });
      };

      return UserController;

    })();
    return {
      UserRouter: UserRouter,
      UserController: UserController
    };
  });

}).call(this);
