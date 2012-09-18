(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Employee, Utils;
    Utils = require('../../scripts/Utils.js');
    return Employee = (function(_super) {

      __extends(Employee, _super);

      function Employee() {
        this.initialize = __bind(this.initialize, this);
        Employee.__super__.constructor.apply(this, arguments);
      }

      Employee.prototype.initialize = function() {
        return this.on('validated', function(isValid, model, attrs) {
          return Utils.showValidationErrors();
        });
      };

      Employee.prototype.defaults = {
        firstname: "",
        lastname: "",
        email: "",
        active: true,
        enddate: "",
        departmentId: ""
      };

      Employee.prototype.urlRoot = '/ekmHoliCal/api/employees/';

      Employee.prototype.idAttribute = "_id";

      Employee.prototype.validation = {
        firstname: {
          required: true,
          msg: 'A first name is required'
        },
        lastname: {
          required: true,
          msg: 'A last name is required'
        },
        email: {
          required: true,
          pattern: 'email',
          msg: 'A valid email address is required'
        },
        departmentId: {
          required: true,
          msg: 'A department is required'
        }
      };

      return Employee;

    })(Backbone.Model);
  });

}).call(this);
