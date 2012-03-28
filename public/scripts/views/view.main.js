(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var MainView;
    return MainView = (function(_super) {

      __extends(MainView, _super);

      function MainView() {
        MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.initialize = function() {
        return this.template = require('text!../../templates/tmpl.main.region.html');
      };

      return MainView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
