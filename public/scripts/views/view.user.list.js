(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UserItemView, UserListView;
    UserItemView = require('../../scripts/views/view.user.item.js');
    return UserListView = (function(_super) {

      __extends(UserListView, _super);

      function UserListView() {
        this.onRender = __bind(this.onRender, this);
        this.beforeRender = __bind(this.beforeRender, this);
        this.initialize = __bind(this.initialize, this);
        UserListView.__super__.constructor.apply(this, arguments);
      }

      UserListView.prototype.itemView = UserItemView;

      UserListView.prototype.tagName = "table";

      UserListView.prototype.className = "table table-striped table-bordered";

      UserListView.prototype.id = "user-list";

      UserListView.prototype.initialize = function() {
        this.onRenderCalled = 0;
        return this.gridHeader = require('../../scripts/text!user_grid_header.html');
      };

      UserListView.prototype.beforeRender = function() {
        if (this.before_render_fired != null) return;
        this.before_render_fired = true;
        return this.$el.prepend(this.gridHeader);
      };

      UserListView.prototype.onRender = function() {
        this.onRenderCalled += 1;
        if (this.onRenderCalled < 2) return;
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
  });

}).call(this);
