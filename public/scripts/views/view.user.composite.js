(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserCompositeView, UserItemView, Utils;
    Utils = require('../../scripts/Utils.js');
    UserItemView = require('../../scripts/views/view.user.item.js');
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    return UserCompositeView = (function(_super) {

      __extends(UserCompositeView, _super);

      function UserCompositeView() {
        this.enhanceModel = __bind(this.enhanceModel, this);
        this.initialize = __bind(this.initialize, this);
        UserCompositeView.__super__.constructor.apply(this, arguments);
      }

      UserCompositeView.prototype.itemView = UserItemView;

      UserCompositeView.prototype.itemViewContainer = '#users';

      UserCompositeView.prototype.initialize = function() {
        this.template = require('../../scripts/text!user_department_header.html');
        this.collection = new Backbone.Collection(this.model.get("users"));
        return this.enhanceModel();
      };

      UserCompositeView.prototype.enhanceModel = function() {
        var _this = this;
        _.each(this.collection.models, function(user) {
          user.set("fullname", "" + (user.get('firstname')) + " " + (user.get('lastname')));
          return user.set("gravatar", "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(user.get('email')));
        });
      };

      return UserCompositeView;

    })(Backbone.Marionette.CompositeView);
  });

}).call(this);
