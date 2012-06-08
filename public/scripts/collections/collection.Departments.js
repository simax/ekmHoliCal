(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Department;
    Department = require('../../scripts/models/model.department.js');
    return app.Departments = (function(_super) {

      __extends(Departments, _super);

      function Departments() {
        Departments.__super__.constructor.apply(this, arguments);
      }

      Departments.prototype.model = Department;

      Departments.prototype.url = "/ekmHoliCal/api/departments";

      return Departments;

    })(Backbone.Collection);
  });

}).call(this);
