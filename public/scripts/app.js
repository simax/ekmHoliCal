(function() {

  define(function(require) {
    var MainNavigationMenuView, routeDepartment, routeMain, routeUser;
    routeMain = require('../scripts/routers/router.main.js');
    routeUser = require('../scripts/routers/router.user.js');
    routeDepartment = require('../scripts/routers/router.department.js');
    MainNavigationMenuView = require('../scripts/views/view.main.navigation');
    window.app = !window.app ? new Backbone.Marionette.Application() : window.app;
    app.bind("initialize:before", function(options) {
      var _this = this;
      Backbone.Marionette.TemplateCache.loadTemplate = function(template, callback) {
        var compiledTemplate;
        compiledTemplate = Handlebars.compile($(template).html());
        return callback.call(_this, compiledTemplate);
      };
      return Backbone.Marionette.Renderer.render = function(template, data) {
        return Handlebars.compile($(template).html())(data);
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
    app.vent.on("main:admin:departments", function() {
      return app.departmentRouter.navigate("admin/departments", true);
    });
    return app.start();
  });

}).call(this);
