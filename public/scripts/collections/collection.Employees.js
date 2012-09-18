(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Employee, Employees;
    Employee = require('../../scripts/models/model.employee.js');
    return Employees = (function(_super) {

      __extends(Employees, _super);

      function Employees() {
        Employees.__super__.constructor.apply(this, arguments);
      }

      Employees.prototype.model = Employee;

      Employees.prototype.url = "/ekmHoliCal/api/employees";

      return Employees;

    })(Backbone.Collection);
  });

}).call(this);
