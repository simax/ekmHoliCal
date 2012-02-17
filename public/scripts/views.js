(function() {
  var UserEditView, UserItemView, UserListView, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.app = (_ref = window.app) != null ? _ref : new Backbone.Marionette.Application();

  UserItemView = (function(_super) {

    __extends(UserItemView, _super);

    function UserItemView() {
      UserItemView.__super__.constructor.apply(this, arguments);
    }

    UserItemView.prototype.template = "#item";

    UserItemView.prototype.tagName = "li";

    UserItemView.prototype.events = {
      "click .edit": "edit",
      "click .remove": "delete"
    };

    UserItemView.prototype["delete"] = function(e) {
      return this.model.destroy();
    };

    UserItemView.prototype.edit = function(e) {
      return alert(JSON.stringify(this.model));
    };

    return UserItemView;

  })(Backbone.Marionette.ItemView);

  this.app.UserItemView = UserItemView;

  UserListView = (function(_super) {

    __extends(UserListView, _super);

    function UserListView() {
      UserListView.__super__.constructor.apply(this, arguments);
    }

    UserListView.prototype.tagName = "ul";

    UserListView.prototype.itemView = app.UserItemView;

    return UserListView;

  })(Backbone.Marionette.CollectionView);

  this.app.UserListView = UserListView;

  UserEditView = (function(_super) {

    __extends(UserEditView, _super);

    function UserEditView() {
      UserEditView.__super__.constructor.apply(this, arguments);
    }

    UserEditView.prototype.template = "#user-maintenance";

    UserEditView.prototype.events = {
      "submit #add-edit-form": "save"
    };

    UserEditView.prototype.save = function(e) {
      var model;
      e.preventDefault();
      model = new app.User;
      this.model.username = this.$("#username").val();
      this.model.address = this.$("#address").val();
      this.clear();
      if (this.model.id) {
        return this.model.save;
      } else {
        return this.collection.create(model);
      }
    };

    UserEditView.prototype.clear = function() {
      this.$("#username").val("");
      return this.$("#address").val("");
    };

    return UserEditView;

  })(Backbone.Marionette.ItemView);

  this.app.UserEditView = UserEditView;

}).call(this);
