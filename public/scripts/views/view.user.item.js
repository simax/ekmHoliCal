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
        this.onClose = __bind(this.onClose, this);
        this.onShow = __bind(this.onShow, this);
        UserItemView.__super__.constructor.apply(this, arguments);
      }

      UserItemView.prototype.template = "#tmpl-user-item";

      UserItemView.prototype.initialize = function() {
        this.modelBinder = new Backbone.ModelBinder();
        this.template = require('../../scripts/text!user_item.html');
        return this.model.set("users", new Backbone.Collection(this.model.get("users")));
      };

      UserItemView.prototype.events = {
        "click .edit": "edit",
        "click .active-status": "toggleActivation",
        "click .btn-remove-user": "removeUser"
      };

      UserItemView.prototype.toggleActivation = function(e) {
        return alert(this.model.get("active"));
      };

      UserItemView.prototype.removeUser = function(e) {
        var remove;
        remove = confirm("Remove " + (this.model.get('fullname')));
        return this.model.destroy();
      };

      UserItemView.prototype.edit = function() {
        var deptid, id;
        deptid = this.model.get("departmentId");
        id = this.model.get("id");
        new app.UserController().adminUsersEdit(deptid, id);
        return Backbone.history.navigate("admin/department/" + this.model.get("departmentId") + "/user/edit/" + this.model.get("id"));
      };

      UserItemView.prototype.onShow = function() {
        this.modelBinder.bind(this.model, this.el);
        return Backbone.Validation.bind(this, {
          forceUpdate: true
        });
      };

      UserItemView.prototype.onClose = function() {
        return this.modelBinder.unbind();
      };

      return UserItemView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
