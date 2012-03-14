(function() {
  var UserNavigationView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    return require('text!templates/tmpl.user.navigation.html');
  });

  UserNavigationView = (function(_super) {

    __extends(UserNavigationView, _super);

    function UserNavigationView() {
      UserNavigationView.__super__.constructor.apply(this, arguments);
    }

    UserNavigationView.prototype.template = "#tmpl-user-navigation";

    UserNavigationView.prototype.className = "row";

    UserNavigationView.prototype.events = {
      "click #create": "create"
    };

    UserNavigationView.prototype.create = function(e) {
      e.preventDefault();
      return app.vent.trigger("admin:users:create");
    };

    return UserNavigationView;

  })(Backbone.Marionette.ItemView);

  return UserNavigationView;

}).call(this);
