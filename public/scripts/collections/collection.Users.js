(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var User, Users;
    User = require('../../scripts/models/model.user.js');
    return Users = (function(_super) {

      __extends(Users, _super);

      function Users() {
        Users.__super__.constructor.apply(this, arguments);
      }

      Users.prototype.model = User;

      Users.prototype.url = "/ekmHoliCal/api/users";

      return Users;

    })(Backbone.Collection);
  });

}).call(this);
