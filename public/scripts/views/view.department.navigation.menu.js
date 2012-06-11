(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentNavigationView;
    return DepartmentNavigationView = (function(_super) {

      __extends(DepartmentNavigationView, _super);

      function DepartmentNavigationView() {
        DepartmentNavigationView.__super__.constructor.apply(this, arguments);
      }

      DepartmentNavigationView.prototype.className = "row";

      DepartmentNavigationView.prototype.initialize = function() {
        return this.template = require('../../scripts/text!department_navigation.html');
      };

      DepartmentNavigationView.prototype.events = {
        "click #create": "create"
      };

      DepartmentNavigationView.prototype.create = function(e) {
        e.preventDefault();
        new app.DepartmentController().adminDepartmentsCreate();
        return Backbone.history.navigate("admin/users/create/");
      };

      return DepartmentNavigationView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
