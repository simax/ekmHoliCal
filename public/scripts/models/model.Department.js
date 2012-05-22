(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Department, Utils;
    Utils = require('../../scripts/Utils.js');
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    Department = (function(_super) {

      __extends(Department, _super);

      function Department() {
        this.initialize = __bind(this.initialize, this);
        Department.__super__.constructor.apply(this, arguments);
      }

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

      return Department;

    })(Backbone.RelationalModel);
    app.Department = Department;
    app.Department.setup();
    return app.Department;
  });

}).call(this);
