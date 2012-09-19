(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Department, Departments, EmployeeMaintenanceView, Utils;
    require('jqueryUI');
    require('jqueryQtip');
    require('select2');
    Utils = require('../../scripts/Utils.js');
    Departments = require('../../scripts/collections/collection.departments.js');
    Department = require('../../scripts/models/model.department.js');
    return EmployeeMaintenanceView = (function(_super) {

      __extends(EmployeeMaintenanceView, _super);

      function EmployeeMaintenanceView() {
        this.close = __bind(this.close, this);
        this.SetGravatarImage = __bind(this.SetGravatarImage, this);
        this.getGravatarURL = __bind(this.getGravatarURL, this);
        this.onClose = __bind(this.onClose, this);
        this.onShow = __bind(this.onShow, this);
        this.refresh = __bind(this.refresh, this);
        this.departmentsLoaded = __bind(this.departmentsLoaded, this);
        this.validationFailed = __bind(this.validationFailed, this);
        this.initialize = __bind(this.initialize, this);
        EmployeeMaintenanceView.__super__.constructor.apply(this, arguments);
      }

      EmployeeMaintenanceView.prototype.className = "row";

      EmployeeMaintenanceView.prototype.initialize = function() {
        this.modelBinder = new Backbone.ModelBinder();
        this.template = require('../../scripts/text!employee_maintenance.html');
        this.model.on('change:email', this.SetGravatarImage, this);
        this.model.get("departments").on('reset', this.departmentsLoaded, this);
        return this.model.on('validated:invalid', this.validationFailed, this);
      };

      EmployeeMaintenanceView.prototype.validationFailed = function(model, attrs) {
        if (_.indexOf(attrs, "departmentId")) {
          attrs.remove("departmentId");
          return $(".invalid").removeAttr('data-error').removeClass("invalid");
        }
      };

      EmployeeMaintenanceView.prototype.events = {
        "click #cancel-button": "cancel",
        "submit #employee-maintenance": "save",
        "focus #enddate": "showDatePicker"
      };

      EmployeeMaintenanceView.prototype.departmentsLoaded = function() {
        this.model.get("departments").unshift(new Department());
        return this.refresh();
      };

      EmployeeMaintenanceView.prototype.refresh = function() {
        this.render();
        return this.onShow();
      };

      EmployeeMaintenanceView.prototype.save = function(e) {
        var modelValid;
        e.preventDefault();
        modelValid = true;
        if (modelValid) {
          this.model.save(this.model.toJSON(), {
            error: function(model, res) {
              if (res.responseText !== "OK") {
                return alert("Error: " + res.responseText);
              }
            }
          });
          return app.vent.trigger("main:admin:employees");
        }
      };

      EmployeeMaintenanceView.prototype.cancel = function(e) {
        e.preventDefault();
        return app.vent.trigger("main:admin:employees");
      };

      EmployeeMaintenanceView.prototype.onShow = function() {
        this.modelBinder.bind(this.model, this.el);
        this.SetGravatarImage();
        return $('#departmentId').select2({
          placeholder: "Select a department"
        });
      };

      EmployeeMaintenanceView.prototype.onClose = function() {
        return this.modelBinder.unbind();
      };

      EmployeeMaintenanceView.prototype.getGravatarURL = function() {
        return "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(this.model.get("email"));
      };

      EmployeeMaintenanceView.prototype.SetGravatarImage = function() {
        return $("#employee-gravatar").attr("src", this.getGravatarURL());
      };

      EmployeeMaintenanceView.prototype.showDatePicker = function() {
        return $('#enddate').datepicker({
          constrainedInput: true,
          dateFormat: 'dd/mm/yy',
          changeMonth: true,
          changeYear: true,
          showButtonPanel: true
        });
      };

      EmployeeMaintenanceView.prototype.hideDatePicker = function() {
        return $('#enddate').datepicker('hide');
      };

      EmployeeMaintenanceView.prototype.close = function() {
        this.hideDatePicker();
        return EmployeeMaintenanceView.__super__.close.apply(this, arguments);
      };

      return EmployeeMaintenanceView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
