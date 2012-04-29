(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserItemView, UserListView;
    UserItemView = require('../../scripts/views/view.user.item.js');
    return UserListView = (function(_super) {

      __extends(UserListView, _super);

      function UserListView() {
        UserListView.__super__.constructor.apply(this, arguments);
      }

      UserListView.prototype.itemView = UserItemView;

      UserListView.prototype.tagName = "table";

      UserListView.prototype.className = "table table-striped table-bordered";

      UserListView.prototype.id = "user-list";

      return UserListView;

    })(Backbone.Marionette.CollectionView);
  });

}).call(this);
