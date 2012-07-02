(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserCompositeView, UserListEmptyView, UserListView;
    UserCompositeView = require('../../scripts/views/view.user.composite.js');
    UserListEmptyView = require('../../scripts/views/view.user.list.empty.js');
    return UserListView = (function(_super) {

      __extends(UserListView, _super);

      function UserListView() {
        UserListView.__super__.constructor.apply(this, arguments);
      }

      UserListView.prototype.itemView = UserCompositeView;

      UserListView.prototype.id = "user-list";

      UserListView.prototype.emptyView = UserListEmptyView;

      return UserListView;

    })(Backbone.Marionette.CollectionView);
  });

}).call(this);
