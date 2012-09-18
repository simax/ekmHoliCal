(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var EmployeeNavigationView;
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    return EmployeeNavigationView = (function(_super) {

      __extends(EmployeeNavigationView, _super);

      function EmployeeNavigationView() {
        EmployeeNavigationView.__super__.constructor.apply(this, arguments);
      }

      EmployeeNavigationView.prototype.className = "row";

      EmployeeNavigationView.prototype.initialize = function() {
        this.template = require('../../scripts/text!employee_navigation.html');
      };

      EmployeeNavigationView.prototype.events = {
        "click #create": "create"
      };

      EmployeeNavigationView.prototype.create = function(e) {
        e.preventDefault();
        new app.EmployeeController().adminEmployeesCreate();
        return Backbone.history.navigate("admin/employees/create/");
      };

      return EmployeeNavigationView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
