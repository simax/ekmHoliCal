(function() {
  var User, _ref,
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
      }
    };

    User.prototype.initialize = function() {
      return this.on('validated', function(isValid, model, attrs) {
        console.log('OnValidated event isValid: ' + isValid);
        $(':not(.invalid)').qtip('destroy');
        return $('.invalid').qtip({
          overwrite: false,
          content: {
            text: function(api) {
              return $(this).attr('data-error');
            }
          },
          position: {
            my: 'left center',
            at: 'right center',
            viewport: $(window)
          },
          show: {
            event: false,
            ready: true
          },
          hide: false,
          style: {
            classes: 'ui-tooltip-jtools'
          }
        });
      });
    };

    return User;

  })(Backbone.Model);

  this.app = (_ref = window.app) != null ? _ref : new Backbone.Marionette.Application();

  this.app.User = User;

}).call(this);
