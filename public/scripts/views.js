(function() {
  var UserItemView, UserListView, UserView, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  UserItemView = (function(_super) {

    __extends(UserItemView, _super);

    function UserItemView() {
      UserItemView.__super__.constructor.apply(this, arguments);
    }

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

    UserItemView.prototype.render = function() {
      this.template.tmpl(this.model.toJSON()).appendTo(this.el);
      return this;
    };

    return UserItemView;

  })(Backbone.View);

  UserListView = (function(_super) {

    __extends(UserListView, _super);

    function UserListView() {
      UserListView.__super__.constructor.apply(this, arguments);
    }

    UserListView.prototype.tagName = "ul";

    UserListView.prototype.initialize = function() {
      _.bindAll(this, "render");
      this.collection.bind("add", this.render);
      this.collection.bind("remove", this.render);
      this.collection.bind("reset", this.render);
      return this.render();
    };

    UserListView.prototype.render = function() {
      var els;
      els = [];
      this.collection.each(function(model) {
        var view;
        view = new UserItemView({
          model: model
        });
        return els.push(view.render().el);
      });
      $(this.el).empty();
      $(this.el).append(els);
      return this;
    };

    return UserListView;

  })(Backbone.View);

  UserView = (function(_super) {

    __extends(UserView, _super);

    function UserView() {
      UserView.__super__.constructor.apply(this, arguments);
    }

    UserView.prototype.initialize = function() {
      _.bindAll(this, "render");
      this.template = $("#userTemplate");
      console.log("UserView.model: ");
      return this.render();
    };

    UserView.prototype.events = {
      "submit #add-edit-form": "save"
    };

    UserView.prototype.save = function(e) {
      return e.preventDefault();
    };

    UserView.prototype.clear = function() {
      this.$("#username").val("");
      return this.$("#address").val("");
    };

    UserView.prototype.render = function() {
      this.template.tmpl(this.model.toJSON()).appendTo(this.el);
      return this;
    };

    return UserView;

  })(Backbone.View);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.UserItemView = UserItemView;

  this.app.UserListView = UserListView;

  this.app.UserView = UserView;

}).call(this);
