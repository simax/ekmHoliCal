(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, MainView;
    Backbone = require('backbone');
    MainView = (function(_super) {

      __extends(MainView, _super);

      function MainView() {
        MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = "#tmpl-main-region";

      return MainView;

    })(Backbone.Marionette.ItemView);
    return MainView;
  });

}).call(this);
