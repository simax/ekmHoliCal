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
        this.fetchViewData = __bind(this.fetchViewData, this);
        this.adminUsersEdit = __bind(this.adminUsersEdit, this);
        this.adminUsersCreate = __bind(this.adminUsersCreate, this);
      }

      UserController.prototype.adminUsersCreate = function() {
        var fetchData,
          _this = this;
        fetchData = this.fetchViewData;
        return fetchData().done(function() {
          var userMaintenanceView;
          _this.model = new User();
          userMaintenanceView = new UserMaintenanceView({
            model: _this.model
          });
          return app.mainRegion.show(userMaintenanceView);
        });
      };

      UserController.prototype.adminUsersEdit = function(id) {
        var fetchData,
          _this = this;
        fetchData = this.fetchViewData;
        return fetchData().done(function() {
          var userMaintenanceView;
          _this.model = _this.users.get(id);
          userMaintenanceView = new UserMaintenanceView({
            model: _this.model
          });
          return app.mainRegion.show(userMaintenanceView);
        });
      };

      UserController.prototype.fetchViewData = function() {
        var dfd,
          _this = this;
        dfd = $.Deferred();
        Users = require('../../scripts/collections/collection.users.js');
        this.users = new Users();
        this.users.fetch({
          success: function() {
            return dfd.resolve();
          },
          error: function() {
            return dfd.reject();
          }
        });
        return dfd.promise();
      };

      return UserController;

    })();
    return {
      UserRouter: UserRouter,
      UserController: UserController
    };
  });

}).call(this);
