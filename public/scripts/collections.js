(function() {
  var Departments, Users, _ref, _ref2,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Users = (function(_super) {

    __extends(Users, _super);

    function Users() {
      Users.__super__.constructor.apply(this, arguments);
    }

    Users.prototype.model = app.User;

    Users.prototype.url = "/ekmHoliCal/api/users";

    return Users;

  })(Backbone.Collection);

  this.app = (_ref = window.app) != null ? _ref : new Backbone.Marionette.Application();

  this.app.Users = Users;

  this.app.users = new this.app.Users;

  this.app.users.fetch();

  Departments = (function(_super) {

    __extends(Departments, _super);

    function Departments() {
      Departments.__super__.constructor.apply(this, arguments);
    }

    Departments.prototype.model = app.Department;

    Departments.prototype.url = "/ekmHoliCal/api/departments";

    return Departments;

  })(Backbone.Collection);

  this.app = (_ref2 = window.app) != null ? _ref2 : new Backbone.Marionette.Application();

  this.app.Departments = Departments;

  this.app.departments = new this.app.Departments;

  this.app.departments.fetch();

}).call(this);
