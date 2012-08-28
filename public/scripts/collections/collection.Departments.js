(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Department, Departments;
    Department = require('../../scripts/models/model.department.js');
    return Departments = (function(_super) {

      __extends(Departments, _super);

      function Departments() {
        Departments.__super__.constructor.apply(this, arguments);
      }

      Departments.prototype.model = Department;

      Departments.prototype.url = "/ekmHoliCal/api/departments";

      Departments.prototype.parse = function(resp, xhr) {
        var deps, user, _i, _j, _len, _len2, _ref;
        for (_i = 0, _len = resp.length; _i < _len; _i++) {
          deps = resp[_i];
          _ref = deps.users;
          for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
            user = _ref[_j];
            user.id = user._id;
          }
        }
        return resp;
      };

      return Departments;

    })(Backbone.Collection);
  });

}).call(this);
