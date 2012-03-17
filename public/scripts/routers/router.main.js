(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, MainController, MainRouter, MainView, UserListView, UserNavigationView, Users, UsersLayoutView;
    Backbone = require('backbone');
    require('marionette');
    MainView = require('../../scripts/views/view.main.js');
    UsersLayoutView = require('../../scripts/views/view.users.layout.js');
    UserNavigationView = require('../../scripts/views/view.user.navigation.menu.js');
    UserListView = require('../../scripts/views/view.user.list.js');
    Users = require('../../scripts/collections/collection.Users');
    MainRouter = (function(_super) {

      __extends(MainRouter, _super);

      function MainRouter() {
        MainRouter.__super__.constructor.apply(this, arguments);
      }

      MainRouter.prototype.appRoutes = {
        "": "home",
        "admin/users": "admin",
        "admin/departments": "departments"
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
        var userListView, users, usersLayoutView;
        usersLayoutView = new UsersLayoutView;
        app.mainRegion.show(usersLayoutView);
        usersLayoutView.navigationRegion.show(new UserNavigationView);
        users = new Users();
        users.fetch();
        userListView = new UserListView({
          collection: users
        });
        return usersLayoutView.listRegion.show(userListView);
      };

      return MainController;

    })();
    return {
      MainRouter: MainRouter,
      MainController: MainController
    };
  });

}).call(this);
