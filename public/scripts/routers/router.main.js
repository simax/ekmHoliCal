(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AdminLayoutView, AdminNavigationView, MainController, MainRouter, MainView;
    MainView = require('../../scripts/views/view.main.js');
    AdminLayoutView = require('../../scripts/views/view.admin.layout.js');
    AdminNavigationView = require('../../scripts/views/view.admin.navigation.menu.js');
    MainRouter = (function(_super) {

      __extends(MainRouter, _super);

      function MainRouter() {
        MainRouter.__super__.constructor.apply(this, arguments);
      }

      MainRouter.prototype.appRoutes = {
        "": "home",
        "admin": "admin"
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

      MainController.prototype.admin = function() {
        this.adminLayoutView = new AdminLayoutView;
        this.adminLayoutView.render();
        app.mainRegion.show(this.adminLayoutView);
        return this.adminLayoutView.navigationRegion.show(new AdminNavigationView);
      };

      return MainController;

    })();
    return {
      MainRouter: MainRouter,
      MainController: MainController
    };
  });

}).call(this);
