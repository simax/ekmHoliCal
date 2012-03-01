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
      Backbone.Validation.configure({
        selector: 'id'
      });
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
        "admin/create": "adminCreate"
      }
    });
    app.UserController = {
      adminCreate: function() {
        var userCreateView;
        userCreateView = new app.UserCreateView({
          collection: app.users,
          model: new app.User()
        });
        return app.mainRegion.show(userCreateView);
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
    app.vent.bind("main:home", function(message) {
      return Backbone.history.navigate("", true);
    });
    app.vent.bind("main:admin", function(message) {
      return Backbone.history.navigate("admin", true);
    });
    app.vent.bind("admin:create", function(message) {
      return Backbone.history.navigate("admin/create", true);
    });
    return app.start();
  });

}).call(this);
