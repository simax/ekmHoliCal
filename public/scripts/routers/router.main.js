(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentListView, DepartmentNavigationView, Departments, DepartmentsLayoutView, MainController, MainRouter, MainView, UserListView, UserNavigationView, Users, UsersLayoutView;
    MainView = require('../../scripts/views/view.main.js');
    UsersLayoutView = require('../../scripts/views/view.users.layout.js');
    UserNavigationView = require('../../scripts/views/view.user.navigation.menu.js');
    UserListView = require('../../scripts/views/view.user.list.js');
    Users = require('../../scripts/collections/collection.users.js');
    DepartmentsLayoutView = require('../../scripts/views/view.departments.layout.js');
    DepartmentNavigationView = require('../../scripts/views/view.department.navigation.menu.js');
    DepartmentListView = require('../../scripts/views/view.department.list.js');
    Departments = require('../../scripts/collections/collection.departments');
    MainRouter = (function(_super) {

      __extends(MainRouter, _super);

      function MainRouter() {
        MainRouter.__super__.constructor.apply(this, arguments);
      }

      MainRouter.prototype.appRoutes = {
        "": "home",
        "admin/users": "adminUsers",
        "admin/departments": "adminDepartments"
      };

      return MainRouter;

    })(Backbone.Marionette.AppRouter);
    MainController = (function() {

      function MainController() {}

      MainController.prototype.home = function() {
        var mainView;
        mainView = new MainView;
        return app.mainRegion.show(mainView);
      };

      MainController.prototype.adminUsers = function() {
        var userListView, usersLayoutView;
        usersLayoutView = new UsersLayoutView;
        app.mainRegion.show(usersLayoutView);
        usersLayoutView.navigationRegion.show(new UserNavigationView);
        console.log("adminUsers");
        app.data.users = new Users();
        app.data.users.fetch();
        userListView = new UserListView({
          collection: app.data.users
        });
        return usersLayoutView.listRegion.show(userListView);
      };

      MainController.prototype.adminDepartments = function() {
        var departmentListView, departments, departmentsLayoutView;
        departmentsLayoutView = new DepartmentsLayoutView;
        app.mainRegion.show(departmentsLayoutView);
        departmentsLayoutView.navigationRegion.show(new DepartmentNavigationView);
        departments = new Departments();
        departments.fetch();
        departmentListView = new DepartmentListView({
          collection: departments
        });
        return departmentsLayoutView.listRegion.show(departmentListView);
      };

      return MainController;

    })();
    return {
      MainRouter: MainRouter,
      MainController: MainController
    };
  });

}).call(this);
