(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Departments, UserMaintenanceView, Utils;
    Backbone.ModelBinding = require('modelbinding');
    require('jqueryUI');
    require('jqueryQtip');
    Utils = require('../../scripts/Utils.js');
    Departments = require('../../scripts/collections/collection.departments.js');
    return UserMaintenanceView = (function(_super) {

      __extends(UserMaintenanceView, _super);

      function UserMaintenanceView() {
        this.fetchDepartments = __bind(this.fetchDepartments, this);
        this.close = __bind(this.close, this);
        this.SetGravatarImage = __bind(this.SetGravatarImage, this);
        this.getGravatarURL = __bind(this.getGravatarURL, this);
        this.onShow = __bind(this.onShow, this);
        this.initialize = __bind(this.initialize, this);
        UserMaintenanceView.__super__.constructor.apply(this, arguments);
      }

      UserMaintenanceView.prototype.className = "row";

      UserMaintenanceView.prototype.initialize = function() {
        this.template = require('../../scripts/text!user_maintenance.html');
        this.model.on('change:email', this.SetGravatarImage, this);
        return this.fetchDepartments();
      };

      UserMaintenanceView.prototype.events = {
        "click #cancel-button": "cancel",
        "submit #user-create": "save",
        "focus #startdate": "showDatePicker"
      };

      UserMaintenanceView.prototype.save = function(e) {
        var modelValid;
        e.preventDefault();
        modelValid = this.model.isValid(true);
        console.log("Is model valid:" + modelValid);
        if (modelValid) {
          this.model.save(this.model.attributes, {
            error: function(model, res) {
              return alert(res.responseText);
            }
          });
          return app.vent.trigger("main:admin:users");
        }
      };

      UserMaintenanceView.prototype.cancel = function(e) {
        e.preventDefault();
        return app.vent.trigger("main:admin:users");
      };

      UserMaintenanceView.prototype.onShow = function() {
        Backbone.ModelBinding.bind(this);
        Backbone.Validation.bind(this, {
          forceUpdate: true
        });
        return this.SetGravatarImage();
      };

      UserMaintenanceView.prototype.getGravatarURL = function() {
        return "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(this.model.get("email"));
      };

      UserMaintenanceView.prototype.SetGravatarImage = function() {
        return $("#user-gravatar").attr("src", this.getGravatarURL());
      };

      UserMaintenanceView.prototype.showDatePicker = function() {
        return $('#startdate').datepicker({
          constrainedInput: true,
          dateFormat: 'dd/mm/yy',
          changeMonth: true,
          changeYear: true,
          showButtonPanel: true
        });
      };

      UserMaintenanceView.prototype.hideDatePicker = function() {
        return $('#startdate').datepicker('hide');
      };

      UserMaintenanceView.prototype.close = function() {
        this.hideDatePicker();
        return UserMaintenanceView.__super__.close.apply(this, arguments);
      };

      UserMaintenanceView.prototype.fetchDepartments = function() {
        var currentDepartmentId, deps, me,
          _this = this;
        me = this;
        currentDepartmentId = this.model.attributes.departmentId ? this.model.attributes.departmentId : "";
        deps = me.model.attributes.departments;
        deps = new Departments();
        deps.comparator = function(model) {
          return model.get('name');
        };
        return deps.fetch({
          success: function(collection, response) {
            collection.add({
              name: '',
              silent: true
            });
            collection.sort();
            deps = collection.toJSON();
            me.model.set({
              departmentId: currentDepartmentId,
              silent: true
            });
            return me.render();
          }
        });
      };

      return UserMaintenanceView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
