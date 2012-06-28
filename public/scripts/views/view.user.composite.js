(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserCompositeView, UserItemView;
    UserItemView = require('../../scripts/views/view.user.item.js');
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    return UserCompositeView = (function(_super) {

      __extends(UserCompositeView, _super);

      function UserCompositeView() {
        this.render = __bind(this.render, this);
        this.buildViewModel = __bind(this.buildViewModel, this);
        this.initialize = __bind(this.initialize, this);
        UserCompositeView.__super__.constructor.apply(this, arguments);
      }

      UserCompositeView.prototype.itemView = UserItemView;

      UserCompositeView.prototype.itemViewContainer = '#users';

      UserCompositeView.prototype.initialize = function() {
        this.template = require('../../scripts/text!user_department_header.html');
        return this.buildViewModel();
      };

      UserCompositeView.prototype.buildViewModel = function() {
        return this.viewModel = kb.viewModel(this.model);
      };

      UserCompositeView.prototype.render = function() {
        UserCompositeView.__super__.render.apply(this, arguments);
        return ko.applyBindings(this.viewModel, this.el);
      };

      return UserCompositeView;

    })(Backbone.Marionette.CompositeView);
  });

}).call(this);
