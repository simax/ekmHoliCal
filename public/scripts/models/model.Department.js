(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Department, Utils;
    Utils = require('../../scripts/Utils.js');
    Department = (function(_super) {

      __extends(Department, _super);

      function Department() {
        Department.__super__.constructor.apply(this, arguments);
      }

      Department.prototype.idAttribute = "_id";

      Department.prototype.validation = {
        name: {
          required: true,
          msg: 'A department name is required'
        }
      };

      Department.prototype.initialize = function() {
        return this.on('validated', function(isValid, model, attrs) {
          return Utils.showValidationErrors();
        });
      };

      return Department;

    })(Backbone.Model);
    return Department;
  });

}).call(this);
