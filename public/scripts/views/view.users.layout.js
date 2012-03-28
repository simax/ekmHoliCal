(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var UsersLayoutView;
    return UsersLayoutView = (function(_super) {

      __extends(UsersLayoutView, _super);

      function UsersLayoutView() {
        UsersLayoutView.__super__.constructor.apply(this, arguments);
      }

      UsersLayoutView.prototype.initialize = function() {
        return this.template = require('text!../../templates/tmpl.users.layout.html');
      };

      UsersLayoutView.prototype.regions = {
        navigationRegion: "#user-navigation-region",
        listRegion: "#user-list-region"
      };

      return UsersLayoutView;

    })(Backbone.Marionette.CompositeRegion);
  });

}).call(this);
