(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserItemView, UserListView;
    UserItemView = require('../../scripts/views/view.user.item.js');
    return UserListView = (function(_super) {

      __extends(UserListView, _super);

      function UserListView() {
        this.appendHtml = __bind(this.appendHtml, this);
        this.initialize = __bind(this.initialize, this);
        UserListView.__super__.constructor.apply(this, arguments);
      }

      UserListView.prototype.itemView = UserItemView;

      UserListView.prototype.tagName = "table";

      UserListView.prototype.className = "table table-striped table-bordered";

      UserListView.prototype.id = "user-list";

      UserListView.prototype.initialize = function() {
        return this.template = require('../../scripts/text!user_grid_header.html');
      };

      UserListView.prototype.appendHtml = function(collectionView, itemView) {
        return collectionView.$("tbody").append(itemView.el);
      };

      return UserListView;

    })(Backbone.Marionette.CompositeView);
  });

}).call(this);
