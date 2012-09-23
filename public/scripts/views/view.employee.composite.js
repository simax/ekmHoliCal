// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var EmployeeCompositeView, EmployeeItemView, Utils, noEmployees;
    Utils = require('../../scripts/Utils.js');
    EmployeeItemView = require('../../scripts/views/view.employee.item.js');
    if (window.app == null) {
      window.app = new Backbone.Marionette.Application();
    }
    noEmployees = require('../../scripts/views/view.employee.list.empty.js');
    return EmployeeCompositeView = (function(_super) {

      __extends(EmployeeCompositeView, _super);

      function EmployeeCompositeView() {
        this.enhanceModel = __bind(this.enhanceModel, this);

        this.addEmployee = __bind(this.addEmployee, this);

        this.initialize = __bind(this.initialize, this);
        return EmployeeCompositeView.__super__.constructor.apply(this, arguments);
      }

      EmployeeCompositeView.prototype.itemView = EmployeeItemView;

      EmployeeCompositeView.prototype.itemViewContainer = '#employees';

      EmployeeCompositeView.prototype.emptyView = noEmployees;

      EmployeeCompositeView.prototype.initialize = function() {
        this.template = require('../../scripts/text!employee_department_header.html');
        this.collection = this.model.employees;
        this.enhanceModel();
        return this.expanded = true;
      };

      EmployeeCompositeView.prototype.events = {
        "click .expander": "toggleExpandCollapse",
        "click .add-employee": "addEmployee"
      };

      EmployeeCompositeView.prototype.addEmployee = function(e) {
        e.preventDefault();
        new app.EmployeeController().adminEmployeesCreate();
        return Backbone.history.navigate("admin/employees/create/");
      };

      EmployeeCompositeView.prototype.toggleExpandCollapse = function(e) {
        var me;
        me = e.target;
        me.src = "../../../images/";
        me.src += me.src.indexOf("expand") !== -1 ? "collapse.png" : "expand.png";
        return $(me).parent().next().slideToggle('slow');
      };

      EmployeeCompositeView.prototype.enhanceModel = function() {
        var _this = this;
        _.each(this.collection.models, function(employee) {
          employee.set("fullname", "" + (employee.get('firstname')) + " " + (employee.get('lastname')));
          return employee.set("gravatar", "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(employee.get('email')));
        });
      };

      return EmployeeCompositeView;

    })(Backbone.Marionette.CompositeView);
  });

}).call(this);
