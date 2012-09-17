(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserListEmptyView, Utils;
    Utils = require('../../scripts/Utils.js');
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    return UserListEmptyView = (function(_super) {

      __extends(UserListEmptyView, _super);

      function UserListEmptyView() {
        UserListEmptyView.__super__.constructor.apply(this, arguments);
      }

      UserListEmptyView.prototype.initialize = function() {
        return this.template = require('../../scripts/text!user_list_empty.html');
      };

      return UserListEmptyView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
