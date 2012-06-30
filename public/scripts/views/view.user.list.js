(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserCompositeView, UserListView;
    UserCompositeView = require('../../scripts/views/view.user.composite.js');
    return UserListView = (function(_super) {

      __extends(UserListView, _super);

      function UserListView() {
        this.appendHtml = __bind(this.appendHtml, this);
        UserListView.__super__.constructor.apply(this, arguments);
      }

      UserListView.prototype.itemView = UserCompositeView;

      UserListView.prototype.id = "user-list";

      UserListView.prototype.appendHtml = function(collectionView, itemView, index) {
        var itemModel;
        itemModel = this.collection.at(index);
        itemView = new UserCompositeView({
          model: itemModel,
          collection: new Backbone.Collection(itemModel.get("users"))
        });
        return collectionView.$el.append(itemView.el);
      };

      return UserListView;

    })(Backbone.Marionette.CollectionView);
  });

}).call(this);
