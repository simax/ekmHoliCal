(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var EmployeesLayoutView;
    return EmployeesLayoutView = (function(_super) {

      __extends(EmployeesLayoutView, _super);

      function EmployeesLayoutView() {
        EmployeesLayoutView.__super__.constructor.apply(this, arguments);
      }

      EmployeesLayoutView.prototype.initialize = function() {
        return this.template = require('text!../../templates/tmpl.employees.layout.html');
      };

      EmployeesLayoutView.prototype.regions = {
        navigationRegion: "#employee-navigation-region",
        listRegion: "#employee-list-region",
        removeRegion: "#employee-remove-region"
      };

      return EmployeesLayoutView;

    })(Backbone.Marionette.Layout);
  });

}).call(this);
