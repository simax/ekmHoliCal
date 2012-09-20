(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var EmployeeItemView, Utils, removeEmployeeModal;
    removeEmployeeModal = require('../../scripts/views/view.employee.remove.modal.js');
    Utils = require('../../scripts/Utils.js');
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    return EmployeeItemView = (function(_super) {

      __extends(EmployeeItemView, _super);

      function EmployeeItemView() {
        this.onClose = __bind(this.onClose, this);
        this.onRender = __bind(this.onRender, this);
        this.showRemoveEmployeeModal = __bind(this.showRemoveEmployeeModal, this);
        EmployeeItemView.__super__.constructor.apply(this, arguments);
      }

      EmployeeItemView.prototype.template = "#tmpl-employee-item";

      EmployeeItemView.prototype.initialize = function() {
        this.modelBinder = new Backbone.ModelBinder();
        return this.template = require('../../scripts/text!employee_item.html');
      };

      EmployeeItemView.prototype.events = {
        "click .edit": "edit",
        "click .btn-remove-employee": "showRemoveEmployeeModal"
      };

      EmployeeItemView.prototype.showRemoveEmployeeModal = function(e) {
        var removeModal;
        removeModal = new removeEmployeeModal({
          model: this.model
        });
        return removeModal.render();
      };

      EmployeeItemView.prototype.edit = function() {
        var deptid, id;
        deptid = this.model.get("departmentId");
        id = this.model.get("id");
        new app.EmployeeController().adminEmployeesEdit(deptid, id);
        return Backbone.history.navigate("admin/department/" + this.model.get("departmentId") + "/employee/edit/" + this.model.get("id"));
      };

      EmployeeItemView.prototype.onRender = function() {
        this.modelBinder.bind(this.model, this.el);
        return Backbone.Validation.bind(this, {
          forceUpdate: true
        });
      };

      EmployeeItemView.prototype.onClose = function() {
        return this.modelBinder.unbind();
      };

      return EmployeeItemView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
