(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Application, MainNavigationMenuView, routeDepartment, routeMain, routeUser;
    routeMain = require('../scripts/routers/router.main.js');
    routeUser = require('../scripts/routers/router.user.js');
    routeDepartment = require('../scripts/routers/router.department.js');
    MainNavigationMenuView = require('../scripts/views/view.main.navigation');
    Application = (function(_super) {

      __extends(Application, _super);

      function Application() {
        Application.__super__.constructor.apply(this, arguments);
      }

      return Application;

    })(Backbone.Marionette.Application);
    window.app = !window.app ? new Application() : window.app;
    app.bind("initialize:before", function(options) {
      var _this = this;
      Backbone.Marionette.TemplateCache.loadTemplate = function(template, callback) {
        var compiledTemplate;
        compiledTemplate = Handlebars.compile($(template).html());
        return callback.call(_this, compiledTemplate);
      };
      return Backbone.Marionette.Renderer.renderTemplate = function(template, data) {
        return template(data);
      };
    });
    app.addInitializer(function() {
      var mainNavMenuView;
      app.data = {};
      mainNavMenuView = new MainNavigationMenuView();
      app.mainNavigationMenuRegion.show(mainNavMenuView);
      app.mainRouter = new routeMain.MainRouter({
        controller: new routeMain.MainController
      });
      app.userRouter = new routeUser.UserRouter({
        controller: new routeUser.UserController
      });
      return app.departmentRouter = new routeDepartment.DepartmentRouter({
        controller: new routeDepartment.DepartmentController
      });
    });
    app.bind("initialize:after", function() {
      if (Backbone.history) return Backbone.history.start();
    });
    app.addRegions({
      mainNavigationMenuRegion: "#main-navigation-menu",
      mainRegion: "#main-content-region"
    });
    app.vent.on("main:home", function() {
      return app.mainRouter.navigate("", true);
    });
    app.vent.on("main:admin", function() {
      return app.mainRouter.navigate("admin", true);
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
    app.vent.on("main:admin:departments", function() {
      return app.departmentRouter.navigate("admin/departments", true);
    });
    app.vent.on("admin:departments:create", function() {
      return app.departmentRouter.navigate("admin/departments/create", true);
    });
    app.vent.on("admin:departments:edit", function(id) {
      return app.departmentRouter.navigate("admin/departments/edit/" + id, true);
    });
    return app.start();
  });

}).call(this);
