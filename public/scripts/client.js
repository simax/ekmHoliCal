(function() {

  $(function() {
    var _this = this;
    app.bind("initialize:before", function(options) {
      return Backbone.Marionette.ItemView.prototype.renderTemplate = function(template, data) {
        return template.tmpl(data);
      };
    });
    app.addInitializer(function() {
      var mainNavMenuView;
      mainNavMenuView = new app.MainNavigationMenuView();
      app.mainNavigationMenuRegion.show(mainNavMenuView);
      app.mainRouter = new app.MainRouter({
        controller: app.MainController
      });
      app.userRouter = new app.UserRouter({
        controller: app.UserController
      });
      return app.departmentRouter = new app.DepartmentRouter({
        controller: app.DepartmentController
      });
    });
    app.bind("initialize:after", function() {
      if (Backbone.history) return Backbone.history.start();
    });
    app.MainRouter = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        "": "home",
        "admin/users": "admin",
        "admin/departments": "departments"
      }
    });
    app.UserRouter = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        "admin/users/create": "adminUsersCreate",
        "admin/users/edit/:id": "adminUsersEdit"
      }
    });
    app.UserController(function() {
      return {
        adminUsersCreate: function() {
          var userMaintenanceView;
          userMaintenanceView = new app.UserMaintenanceView({
            collection: app.users,
            model: new app.User()
          });
          return app.mainRegion.show(userMaintenanceView);
        },
        adminUsersEdit: function(id) {
          var userMaintenanceView;
          console.log("id: " + id);
          userMaintenanceView = new app.UserMaintenanceView({
            collection: app.users,
            model: app.users.get(id)
          });
          return app.mainRegion.show(userMaintenanceView);
        }
      };
    });
    app.DepartmentRouter = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        "admin/departments/create": "adminDepartmentsCreate",
        "admin/departments/edit/:id": "adminDepartmentsEdit"
      }
    });
    app.DepartmentController(function() {
      return {
        adminDepartmentsCreate: function() {
          var userMaintenanceView;
          userMaintenanceView = new app.DepartmentMaintenanceView({
            collection: app.departments,
            model: new app.Department()
          });
          return app.mainRegion.show(departmentMaintenanceView);
        },
        adminDepartmentsEdit: function(id) {
          var departmentMaintenanceView;
          console.log("id: " + id);
          departmentMaintenanceView = new app.DepartmentMaintenanceView({
            collection: app.departments,
            model: app.departments.get(id)
          });
          return app.mainRegion.show(departmentMaintenanceView);
        }
      };
    });
    app.MainController = {
      home: function() {
        var mainView;
        mainView = new app.MainView;
        return app.mainRegion.show(mainView);
      },
      admin: function() {
        var userListView, usersLayoutView;
        usersLayoutView = new app.UsersLayoutView;
        app.mainRegion.show(usersLayoutView);
        usersLayoutView.navigationRegion.show(new app.UserNavigationView);
        app.users.fetch();
        userListView = new app.UserListView({
          collection: app.users
        });
        return usersLayoutView.listRegion.show(userListView);
      }
    };
    app.addRegions({
      mainNavigationMenuRegion: "#main-navigation-menu",
      mainRegion: "#main-region"
    });
    app.vent.on("main:home", function() {
      return app.mainRouter.navigate("", true);
    });
    app.vent.on("main:admin:users", function() {
      return app.userRouter.navigate("admin/users", true);
    });
    app.vent.on("admin:users:create", function() {
      return app.userRouter.navigate("admin/users/create", true);
    });
    app.vent.on("admin:users:edit", function(id) {
      return app.userRouter.navigate("admin/users/edit/" + id, true);
    });
    app.vent.on("admin:departments:create", function() {
      return app.userRouter.navigate("admin/departments/create", true);
    });
    app.vent.on("admin:departments:edit", function(id) {
      return app.userRouter.navigate("admin/departments/edit/" + id, true);
    });
    return app.start();
  });

}).call(this);
