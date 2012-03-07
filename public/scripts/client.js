(function() {

  $(function() {
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
      return app.userRouter = new app.UserRouter({
        controller: app.UserController
      });
    });
    app.bind("initialize:after", function() {
      if (Backbone.history) return Backbone.history.start();
    });
    app.MainRouter = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        "": "home",
        "admin": "admin"
      }
    });
    app.UserRouter = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        "admin/create": "adminCreate",
        "admin/edit/:id": "adminEdit"
      }
    });
    app.UserController = {
      adminCreate: function() {
        var userMaintenanceView;
        userMaintenanceView = new app.UserMaintenanceView({
          collection: app.users,
          model: new app.User()
        });
        return app.mainRegion.show(userMaintenanceView);
      },
      adminEdit: function(id) {
        var userMaintenanceView;
        userMaintenanceView = new app.UserMaintenanceView({
          collection: app.users,
          model: app.users.get(id)
        });
        return app.mainRegion.show(userMaintenanceView);
      }
    };
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
    app.vent.on("main:admin", function() {
      return app.mainRouter.navigate("admin", true);
    });
    app.vent.on("admin:create", function() {
      return app.userRouter.navigate("admin/create", true);
    });
    app.vent.on("admin:edit", function(id) {
      return app.userRouter.navigate("admin/edit/" + id, true);
    });
    return app.start();
  });

}).call(this);
