(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AdminLayoutView;
    return AdminLayoutView = (function(_super) {

      __extends(AdminLayoutView, _super);

      function AdminLayoutView() {
        AdminLayoutView.__super__.constructor.apply(this, arguments);
      }

      AdminLayoutView.prototype.initialize = function() {
        return this.template = require('text!../../templates/tmpl.admin.layout.html');
      };

      AdminLayoutView.prototype.regions = {
        navigationRegion: "#admin-navigation-region",
        contentRegion: "#admin-content-region"
      };

      return AdminLayoutView;

    })(Backbone.Marionette.Layout);
  });

}).call(this);
