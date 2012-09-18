(function() {

  define(function(require) {
    var MainNavigationMenuView, routeDepartment, routeEmployee, routeMain;
    routeMain = require('../scripts/routers/router.main.js');
    routeEmployee = require('../scripts/routers/router.employee.js');
    routeDepartment = require('../scripts/routers/router.department.js');
    MainNavigationMenuView = require('../scripts/views/view.main.navigation');
    window.app = !window.app ? new Backbone.Marionette.Application() : window.app;
    Array.prototype.remove = function(e) {
      var t, _ref;
      if ((t = this.indexOf(e)) > -1) {
        return ([].splice.apply(this, [t, t - t + 1].concat(_ref = [])), _ref);
      }
    };
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
      app.employeeRouter = new routeEmployee.EmployeeRouter({
        controller: new routeEmployee.EmployeeController
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
    app.vent.on("main:admin:employees", function() {
      return app.employeeRouter.navigate("admin/employees", true);
    });
    app.vent.on("main:admin:departments", function() {
      return app.departmentRouter.navigate("admin/departments", true);
    });
    return app.start();
  });

}).call(this);
