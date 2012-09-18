(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Department, Employees, Utils;
    Utils = require('../../scripts/Utils.js');
    Employees = require('../../scripts/collections/collection.Employees.js');
    return Department = (function(_super) {

      __extends(Department, _super);

      function Department() {
        this.parse = __bind(this.parse, this);
        this.initialize = __bind(this.initialize, this);
        Department.__super__.constructor.apply(this, arguments);
      }

      Department.prototype.defaults = {
        name: ""
      };

      Department.prototype.initialize = function() {
        return this.on('validated', function(isValid, model, attrs) {
          return Utils.showValidationErrors();
        });
      };

      Department.prototype.urlRoot = '/ekmHoliCal/api/departments/';

      Department.prototype.idAttribute = "_id";

      Department.prototype.validation = {
        name: {
          required: true,
          msg: 'A department name is required'
        }
      };

      Department.prototype.parse = function(response) {
        this.employees = new Employees(response.employees);
        return response;
      };

      return Department;

    })(Backbone.Model);
  });

}).call(this);
