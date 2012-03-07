(function() {
  var MainNavigationMenuView, MainView, UserItemView, UserListView, UserMaintenanceView, UserNavigationView, UsersLayoutView, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
      "click .active-status": "toggleActivation"
    };

    UserItemView.prototype.toggleActivation = function(e) {
      return alert(JSON.stringify(this.model.get("active")));
    };

    UserItemView.prototype.edit = function(e) {
      var id;
      id = this.model.id;
      return app.vent.trigger("admin:edit", id);
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
      this.$el.html("");
      this.appendHtml(this.$el, $("script#tmpl-user-grid-header").tmpl());
      this.collection.each(this.addChildView);
      this.appendHtml(this.$el, "</tbody></table>");
      if (this.onRender) this.onRender();
      return this;
    };

    return UserListView;

  })(Backbone.Marionette.CollectionView);

  this.app.UserListView = UserListView;

  UserMaintenanceView = (function(_super) {

    __extends(UserMaintenanceView, _super);

    function UserMaintenanceView() {
      this.close = __bind(this.close, this);
      UserMaintenanceView.__super__.constructor.apply(this, arguments);
    }

    UserMaintenanceView.prototype.template = "#tmpl-user-maintenance";

    UserMaintenanceView.prototype.className = "row";

    UserMaintenanceView.prototype.onRender = function() {
      Backbone.ModelBinding.bind(this);
      return Backbone.Validation.bind(this);
    };

    UserMaintenanceView.prototype.events = {
      "click #cancel-button": "cancel",
      "submit #user-create": "save",
      "focus #startdate": "showDatePicker"
    };

    UserMaintenanceView.prototype.showDatePicker = function() {
      return $('#startdate').datepicker({
        constrainedInput: true,
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true
      });
    };

    UserMaintenanceView.prototype.hideDatePicker = function() {
      return $('#startdate').datepicker('hide');
    };

    UserMaintenanceView.prototype.close = function() {
      this.hideDatePicker();
      return UserMaintenanceView.__super__.close.apply(this, arguments);
    };

    UserMaintenanceView.prototype.save = function(e) {
      var modelValid;
      e.preventDefault();
      modelValid = this.model.isValid(true);
      console.log("Is model valid:" + modelValid);
      if (modelValid) {
        if (this.model.isNew()) {
          this.collection.create(this.model, {
            wait: true
          });
        } else {
          this.model.save();
        }
        return app.vent.trigger("main:admin");
      }
    };

    UserMaintenanceView.prototype.cancel = function(e) {
      e.preventDefault();
      return app.vent.trigger("main:admin");
    };

    return UserMaintenanceView;

  })(Backbone.Marionette.ItemView);

  this.app.UserMaintenanceView = UserMaintenanceView;

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

    UsersLayoutView.prototype.regions = {
      navigationRegion: "#user-navigation-region",
      listRegion: "#user-list-region"
    };

    return UsersLayoutView;

  })(Backbone.Marionette.CompositeRegion);

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
