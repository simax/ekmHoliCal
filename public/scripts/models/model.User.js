(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var User, Utils;
    Utils = require('../../scripts/Utils.js');
    return User = (function(_super) {

      __extends(User, _super);

      function User() {
        User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.idAttribute = "_id";

      User.prototype.validation = {
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
        department: {
          required: true,
          msg: 'A department is required'
        }
      };

      User.prototype.initialize = function() {
        return this.on('validated', function(isValid, model, attrs) {
          return Utils.showValidationErrors();
        });
      };

      return User;

    })(Backbone.Model);
  });

}).call(this);
