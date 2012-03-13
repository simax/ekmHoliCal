(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var App, Department, Departments, MainNavigationMenuView, User, Users, routeDepartment, routeMain, routeUser;
    User = require('../models/model.user');
    Users = require('../models/model.users');
    Department = require('../models/model.department');
    Departments = require('../models/model.departments');
    MainNavigationMenuView = require('../views/view.main.navigation');
    routeMain = require('../routers/routers.main.coffee');
    routeUser = require('../routers/routers.user.coffee');
    routeDepartment = require('../routers/routers.department.coffee');
    require("text!../templates/tmpl.main.navigation.html");
    return App = (function(_super) {

      __extends(App, _super);

      function App() {
        this.initialize = __bind(this.initialize, this);
        App.__super__.constructor.apply(this, arguments);
      }

      App.prototype.initialize = function() {
        this.bind("initialize:before", function(options) {
          return Backbone.Marionette.ItemView.prototype.renderTemplate = function(template, data) {
            return template.tmpl(data);
          };
        });
        this.addInitializer(function() {
          var mainNavMenuView;
          mainNavMenuView = new MainNavigationMenuView();
          this.mainNavigationMenuRegion.show(mainNavMenuView);
          this.mainRouter = new routeMain.MainRouter({
            controller: routeMain.MainController
          });
          this.userRouter = new routeUser.UserRouter({
            controller: routeUser.UserController
          });
          return this.departmentRouter = new routeDepartment.DepartmentRouter({
            controller: routeDepartment.DepartmentController
          });
        });
        this.bind("initialize:after", function() {
          if (Backbone.history) return Backbone.history.start();
        });
        this.addRegions({
          mainNavigationMenuRegion: "#main-navigation-menu",
          mainRegion: "#main-region"
        });
        this.vent.on("main:home", function() {
          return this.mainRouter.navigate("", true);
        });
        this.vent.on("main:admin:users", function() {
          return this.userRouter.navigate("admin/users", true);
        });
        this.vent.on("admin:users:create", function() {
          return this.userRouter.navigate("admin/users/create", true);
        });
        this.vent.on("admin:users:edit", function(id) {
          return this.userRouter.navigate("admin/users/edit/" + id, true);
        });
        this.vent.on("admin:departments:create", function() {
          return this.userRouter.navigate("admin/departments/create", true);
        });
        return this.vent.on("admin:departments:edit", function(id) {
          return this.userRouter.navigate("admin/departments/edit/" + id, true);
        });
      };

      return App;

    })(Backbone.Marionette.Application());
  });

  return App;

}).call(this);
