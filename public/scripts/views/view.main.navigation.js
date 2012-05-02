(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var MainNavigationMenuView;
    require('marionette');
    return MainNavigationMenuView = (function(_super) {

      __extends(MainNavigationMenuView, _super);

      function MainNavigationMenuView() {
        MainNavigationMenuView.__super__.constructor.apply(this, arguments);
      }

      MainNavigationMenuView.prototype.template = "#tmpl-main-navigation-menu";

      MainNavigationMenuView.prototype.className = "navbar";

      MainNavigationMenuView.prototype.initialize = function() {
        return this.template = require('text!../../templates/tmpl.main.navigation.menu.html');
      };

      MainNavigationMenuView.prototype.events = {
        "click #main-admin": "adminClick",
        "click #main-home": "homeClick"
      };

      MainNavigationMenuView.prototype.adminClick = function(e) {
        e.preventDefault();
        return app.vent.trigger("main:admin");
      };

      MainNavigationMenuView.prototype.homeClick = function(e) {
        e.preventDefault();
        return app.vent.trigger("main");
      };

      return MainNavigationMenuView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
