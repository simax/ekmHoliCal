(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Application, MainNavigationMenuView, app, routeMain, routeUser;
    routeMain = require('scripts/routers/router.main.js');
    routeUser = require('scripts/routers/router.user.js');
    MainNavigationMenuView = require('scripts/views/view.main.navigation.js');
    Application = (function(_super) {

      __extends(Application, _super);

      function Application() {
        Application.__super__.constructor.apply(this, arguments);
      }

      return Application;

    })(Backbone.Marionette.Application);
    app = new Application();
    app.bind("initialize:before", function(options) {
      return Backbone.Marionette.ItemView.prototype.renderTemplate = function(template, data) {
        return template.tmpl(data);
      };
    });
    app.addInitializer(function() {
      var mainNavMenuView;
      mainNavMenuView = new MainNavigationMenuView();
      app.mainNavigationMenuRegion.show(mainNavMenuView);
      app.mainRouter = new routeMain.MainRouter({
        controller: routeMain.MainController
      });
      return app.userRouter = new routeUser.UserRouter({
        controller: routeUser.UserController
      });
    });
    app.bind("initialize:after", function() {
      if (Backbone.history) return Backbone.history.start();
    });
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
    app.start();
  });

}).call(this);
