(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentsLayoutView;
    return DepartmentsLayoutView = (function(_super) {

      __extends(DepartmentsLayoutView, _super);

      function DepartmentsLayoutView() {
        DepartmentsLayoutView.__super__.constructor.apply(this, arguments);
      }

      DepartmentsLayoutView.prototype.initialize = function() {
        return this.template = require('text!../../templates/tmpl.departments.layout.html');
      };

      DepartmentsLayoutView.prototype.regions = {
        navigationRegion: "#department-navigation-region",
        listRegion: "#department-list-region"
      };

      return DepartmentsLayoutView;

    })(Backbone.Marionette.CompositeRegion);
  });

}).call(this);