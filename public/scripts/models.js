(function() {
  var Department, User, _ref, _ref2,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  User = (function(_super) {

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
        return app.Utils.showValidationErrors();
      });
    };

    return User;

  })(Backbone.Model);

  this.app = (_ref = window.app) != null ? _ref : new Backbone.Marionette.Application();

  this.app.User = User;

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
        return app.Utils.showValidationErrors();
      });
    };

    return Department;

  })(Backbone.Model);

  this.app = (_ref2 = window.app) != null ? _ref2 : new Backbone.Marionette.Application();

  this.app.Department = Department;

}).call(this);
