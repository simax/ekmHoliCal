(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserItemView, Utils;
    Utils = require('../../scripts/Utils.js');
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    return UserItemView = (function(_super) {

      __extends(UserItemView, _super);

      function UserItemView() {
        this.render = __bind(this.render, this);
        this.buildViewModel = __bind(this.buildViewModel, this);
        UserItemView.__super__.constructor.apply(this, arguments);
      }

      UserItemView.prototype.template = "#tmpl-user-item";

      UserItemView.prototype.initialize = function() {
        this.template = require('../../scripts/text!user_item.html');
        return this.buildViewModel();
      };

      UserItemView.prototype.buildViewModel = function() {
        this.viewModel = kb.viewModel(this.model);
        this.viewModel.fullname = kb.formattedObservable("{0} {1}", this.viewModel.firstname, this.viewModel.lastname);
        return this.viewModel.gravatar = kb.formattedObservable("{0}{1}", "http://www.gravatar.com/avatar/", Utils.CreateMD5Hash(this.model.get("email")));
      };

      UserItemView.prototype.events = {
        "click .edit": "edit",
        "click .active-status": "toggleActivation"
      };

      UserItemView.prototype.toggleActivation = function(e) {
        return alert(this.model.get("active"));
      };

      UserItemView.prototype.edit = function() {
        new app.UserController().adminUsersEdit(this.model.id);
        return Backbone.history.navigate("admin/users/edit/" + this.model.id);
      };

      UserItemView.prototype.render = function() {
        UserItemView.__super__.render.apply(this, arguments);
        return ko.applyBindings(this.viewModel, this.el);
      };

      return UserItemView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
