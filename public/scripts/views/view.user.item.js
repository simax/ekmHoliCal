(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserItemView;
    require('text!../../templates/tmpl.user.item.html');
    UserItemView = (function(_super) {

      __extends(UserItemView, _super);

      function UserItemView() {
        UserItemView.__super__.constructor.apply(this, arguments);
      }

      UserItemView.prototype.template = "#tmpl-user-item";

      UserItemView.prototype.tagName = "tr";

      UserItemView.prototype.events = {
        "click .edit": "edit",
        "click .active-status": "toggleActivation"
      };

      UserItemView.prototype.toggleActivation = function(e) {
        return alert(JSON.stringify(this.model.get("active")));
      };

      UserItemView.prototype.edit = function(e) {
        var id;
        id = this.model.id;
        return app.vent.trigger("admin:users:edit", id);
      };

      return UserItemView;

    })(Backbone.Marionette.ItemView);
    return UserItemView;
  });

}).call(this);
