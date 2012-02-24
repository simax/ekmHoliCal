(function() {
  var MainNavigationMenuView, MainView, UserCreateView, UserEditView, UserItemView, UserListView, UserNavigationView, UsersLayoutView, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.app = (_ref = window.app) != null ? _ref : new Backbone.Marionette.Application();

  MainView = (function(_super) {

    __extends(MainView, _super);

    function MainView() {
      MainView.__super__.constructor.apply(this, arguments);
    }

    MainView.prototype.template = "#tmpl-main-region";

    return MainView;

  })(Backbone.Marionette.ItemView);

  this.app.MainView = MainView;

  UserItemView = (function(_super) {

    __extends(UserItemView, _super);

    function UserItemView() {
      UserItemView.__super__.constructor.apply(this, arguments);
    }

    UserItemView.prototype.template = "#tmpl-user-item";

    UserItemView.prototype.tagName = "tr";

    UserItemView.prototype.events = {
      "click .edit": "edit",
      "click .active": "toggleActivation"
    };

    UserItemView.prototype.toggleActivation = function(e) {
      return alert(JSON.stringify(this.model.get("active")));
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

    UserListView.prototype.itemView = app.UserItemView;

    UserListView.prototype.tagName = "table";

    UserListView.prototype.className = "table table-striped";

    UserListView.prototype.render = function() {
      this.appendHtml(this.$el, $("script#tmpl-user-grid-header").tmpl());
      this.collection.each(this.addChildView);
      this.appendHtml(this.$el, "</tbody></table>");
      if (this.onRender) this.onRender();
      return this;
    };

    return UserListView;

  })(Backbone.Marionette.CollectionView);

  this.app.UserListView = UserListView;

  UserEditView = (function(_super) {

    __extends(UserEditView, _super);

    function UserEditView() {
      UserEditView.__super__.constructor.apply(this, arguments);
    }

    UserEditView.prototype.template = "#tmpl-user-maintenance";

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

  UserCreateView = (function(_super) {

    __extends(UserCreateView, _super);

    function UserCreateView() {
      UserCreateView.__super__.constructor.apply(this, arguments);
    }

    UserCreateView.prototype.template = "#tmpl-user-maintenance";

    UserCreateView.prototype.className = "row";

    return UserCreateView;

  })(Backbone.Marionette.ItemView);

  this.app.UserCreateView = UserCreateView;

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
      return app.vent.trigger("admin:create");
    };

    return UserNavigationView;

  })(Backbone.Marionette.ItemView);

  this.app.UserNavigationView = UserNavigationView;

  UsersLayoutView = (function(_super) {

    __extends(UsersLayoutView, _super);

    function UsersLayoutView() {
      UsersLayoutView.__super__.constructor.apply(this, arguments);
    }

    UsersLayoutView.prototype.template = "#tmpl-users-layout";

    UsersLayoutView.prototype.onShow = function() {
      var userListView, userNavigationView;
      app.addRegions({
        navigationRegion: "#user-navigation-region",
        listRegion: "#user-list-region"
      });
      userNavigationView = new app.UserNavigationView;
      app.navigationRegion.show(userNavigationView);
      userListView = new app.UserListView({
        collection: app.users
      });
      return app.listRegion.show(userListView);
    };

    return UsersLayoutView;

  })(Backbone.Marionette.ItemView);

  this.app.UsersLayoutView = UsersLayoutView;

  MainNavigationMenuView = (function(_super) {

    __extends(MainNavigationMenuView, _super);

    function MainNavigationMenuView() {
      MainNavigationMenuView.__super__.constructor.apply(this, arguments);
    }

    MainNavigationMenuView.prototype.template = "#tmpl-main-navigation-menu";

    MainNavigationMenuView.prototype.className = "navbar";

    MainNavigationMenuView.prototype.events = {
      "click #main-admin": "adminClick",
      "click #main-home": "homeClick"
    };

    MainNavigationMenuView.prototype.adminClick = function(e) {
      e.preventDefault();
      return app.vent.trigger("main:admin");
    };

    MainNavigationMenuView.prototype.homeClick = function(e) {
      e.preventDefault();
      return app.vent.trigger("admin:home");
    };

    return MainNavigationMenuView;

  })(Backbone.Marionette.ItemView);

  this.app.MainNavigationMenuView = MainNavigationMenuView;

}).call(this);
