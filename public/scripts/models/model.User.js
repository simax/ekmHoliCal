(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var User, Utils;
    Utils = require('../../scripts/Utils.js');
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    require('../../scripts/models/model.Department.js');
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        this.initialize = __bind(this.initialize, this);
        User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.initialize = function() {
        return this.on('validated', function(isValid, model, attrs) {
          return Utils.showValidationErrors();
        });
      };

      User.prototype.defaults = {
        department: "",
        firstname: "",
        lastname: "",
        email: "",
        active: true,
        enddate: ""
      };

      User.prototype.urlRoot = '/ekmHoliCal/api/users/';

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

      User.prototype.relations = [
        {
          type: Backbone.HasOne,
          key: 'department',
          relatedModel: 'app.Department',
          includeInJSON: "_id",
          reverseRelation: {
            type: Backbone.HasOne,
            key: 'user'
          }
        }
      ];

      return User;

    })(Backbone.RelationalModel);
    app.User = User;
    app.User.setup();
    return app.User;
  });

}).call(this);
