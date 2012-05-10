(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AdminNavigationView;
    return AdminNavigationView = (function(_super) {

      __extends(AdminNavigationView, _super);

      function AdminNavigationView() {
        AdminNavigationView.__super__.constructor.apply(this, arguments);
      }

      AdminNavigationView.prototype.className = "row";

      AdminNavigationView.prototype.initialize = function() {
        return this.template = require('../../scripts/text!admin_navigation.html');
      };

      AdminNavigationView.prototype.events = {
        "click #create": "create"
      };

      AdminNavigationView.prototype.create = function(e) {
        e.preventDefault();
        return app.vent.trigger("admin:users:create");
      };

      return AdminNavigationView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);