(function() {
  var UserItemView, UserListView, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  UserItemView = (function(_super) {

    __extends(UserItemView, _super);

    function UserItemView() {
      UserItemView.__super__.constructor.apply(this, arguments);
    }

    UserItemView.prototype.template = "#detail";

    UserItemView.prototype.tagName = "li";

    UserItemView.prototype.initialize = function() {
      _.bindAll(this, "render", "edit", "remove");
      return this.template = $("#user-list-item-template");
    };

    UserItemView.prototype.events = {
      "click .edit": "edit",
      "click .remove": "remove"
    };

    UserItemView.prototype.remove = function() {
      return this.model.toClient().destroy();
    };

    UserItemView.prototype.edit = function(e) {
      console.log("xxxxxxxxxxxxxx");
      return app.UserView({
        model: this.model
      });
    };

    return UserItemView;

  })(Backbone.View);

  UserListView = (function(_super) {

    __extends(UserListView, _super);

    function UserListView() {
      UserListView.__super__.constructor.apply(this, arguments);
    }

    UserListView.prototype.template = "#list";

    UserListView.prototype.initialize = function() {
      _.bindAll(this, "render");
      this.collection.bind("add", this.render);
      this.collection.bind("remove", this.render);
      return this.collection.bind("reset", this.render);
    };

    UserListView.prototype.render = function() {
      var view;
      view = layout(this);
      this.collection.each(function(model) {
        return view.insert("ul", new UserItemView({
          model: model
        }));
      });
      return view.render();
    };

    return UserListView;

  })(Backbone.View);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.UserListView = UserListView;

}).call(this);
