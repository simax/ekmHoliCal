(function() {
  var MainNavigationMenuView, MainView, UserCreateView, UserItemView, UserListView, UserNavigationView, UsersLayoutView, _ref,
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

    UserListView.prototype.className = "table table-striped table-bordered";

    UserListView.prototype.id = "user-list";

    UserListView.prototype.render = function() {
      this.appendHtml(this.$el, $("script#tmpl-user-grid-header").tmpl());
      this.collection.each(this.addChildView);
      this.appendHtml(this.$el, "</tbody></table>");
      if (this.onRender) this.onRender();
      return this;
    };

    UserListView.prototype.onShow = function() {
      return $("#user-list").dataTable({
        sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
        sPaginationType: "bootstrap",
        oLanguage: {
          sLengthMenu: "_MENU_ records per page"
        }
      });
    };

    return UserListView;

  })(Backbone.Marionette.CollectionView);

  this.app.UserListView = UserListView;

  UserCreateView = (function(_super) {

    __extends(UserCreateView, _super);

    function UserCreateView() {
      UserCreateView.__super__.constructor.apply(this, arguments);
    }

    UserCreateView.prototype.template = "#tmpl-user-maintenance";

    UserCreateView.prototype.className = "row";

    UserCreateView.prototype.events = {
      "click #cancel-button": "cancel",
      "submit #user-create": "save"
    };

    UserCreateView.prototype.save = function(e) {
      var model;
      e.preventDefault();
      model = new app.User;
      model.firstname = this.$("#firstname").val();
      model.lastname = this.$("#lastname").val();
      model.email = this.$("#email").val();
      model.entitlement = 25;
      model.startdate = this.$("#startdate").val();
      model.enddate = "";
      model.active = true;
      this.collection.create(model);
      this.clear();
      return app.vent.trigger("main:admin");
    };

    UserCreateView.prototype.clear = function() {
      this.$("#firstname").val("");
      this.$("#lastname").val("");
      this.$("#email").val("");
      this.$("#entitlement").val("");
      this.$("#startdate").val("");
      return this.$("#active").val("");
    };

    UserCreateView.prototype.cancel = function(e) {
      e.preventDefault();
      return app.vent.trigger("main:admin");
    };

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
