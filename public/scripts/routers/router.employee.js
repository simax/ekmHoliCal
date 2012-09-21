(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Department, Departments, Employee, EmployeeListView, EmployeeMaintenanceView, EmployeeNavigationView, EmployeeRemoveModalView, Employees, EmployeesLayoutView;
    EmployeesLayoutView = require('../../scripts/views/view.employee.layout.js');
    EmployeeNavigationView = require('../../scripts/views/view.employee.navigation.menu.js');
    EmployeeListView = require('../../scripts/views/view.employee.list.js');
    Employees = require('../../scripts/collections/collection.employees.js');
    Employee = require('../../scripts/models/model.employee.js');
    Departments = require('../../scripts/collections/collection.departments.js');
    Department = require('../../scripts/models/model.department.js');
    EmployeeMaintenanceView = require('../../scripts/views/view.employee.maintenance.js');
    EmployeeRemoveModalView = require('../../scripts/views/view.employee.remove.modal.js');
    if (window.app == null) window.app = new Backbone.Marionette.Application();
    app.EmployeeRouter = (function(_super) {

      __extends(EmployeeRouter, _super);

      function EmployeeRouter() {
        EmployeeRouter.__super__.constructor.apply(this, arguments);
      }

      EmployeeRouter.prototype.appRoutes = {
        "admin/employees": "adminEmployees",
        "admin/employees/create": "adminEmployeesCreate",
        "admin/department/:deptid/employee/edit/:id": "adminEmployeesEdit"
      };

      return EmployeeRouter;

    })(Backbone.Marionette.AppRouter);
    app.EmployeeController = (function() {

      function EmployeeController() {
        this.setModel = __bind(this.setModel, this);
        this.showEmployeeMaintenance = __bind(this.showEmployeeMaintenance, this);
        this.removeEmployee = __bind(this.removeEmployee, this);
        this.adminEmployeesRemove = __bind(this.adminEmployeesRemove, this);
        this.editEmployee = __bind(this.editEmployee, this);
        this.adminEmployeesEdit = __bind(this.adminEmployeesEdit, this);
        this.adminEmployeesCreate = __bind(this.adminEmployeesCreate, this);
        this.adminEmployees = __bind(this.adminEmployees, this);
      }

      EmployeeController.prototype.adminEmployees = function() {
        var _this = this;
        app.addAdminLayout();
        app.employeesLayoutView = new EmployeesLayoutView();
        app.adminLayoutView.contentRegion.show(app.employeesLayoutView);
        app.employeesLayoutView.navigationRegion.show(new EmployeeNavigationView);
        this.employeesInDepartments = new Departments();
        return this.employeesInDepartments.fetch({
          success: function() {
            var employeeListView;
            employeeListView = new EmployeeListView({
              collection: _this.employeesInDepartments
            });
            return app.employeesLayoutView.listRegion.show(employeeListView);
          }
        });
      };

      EmployeeController.prototype.adminEmployeesCreate = function() {
        this.model = new Employee();
        return this.showEmployeeMaintenance();
      };

      EmployeeController.prototype.adminEmployeesEdit = function(deptid, id) {
        var _this = this;
        app.adminLayoutView.navigationRegion.close();
        if (this.employeesInDepartments != null) {
          return this.editEmployee(deptid, id);
        } else {
          this.employeesInDepartments = new Departments();
          return this.employeesInDepartments.fetch({
            success: function() {
              return _this.editEmployee(deptid, id);
            }
          });
        }
      };

      EmployeeController.prototype.editEmployee = function(deptid, id) {
        this.setModel(deptid, id);
        return this.showEmployeeMaintenance();
      };

      EmployeeController.prototype.adminEmployeesRemove = function(deptid, id) {
        var _this = this;
        if (this.employeesInDepartments != null) {
          return this.removeEmployee(deptid, id);
        } else {
          this.employeesInDepartments = new Departments();
          return this.employeesInDepartments.fetch({
            success: function() {
              return _this.removeEmployee(deptid, id);
            }
          });
        }
      };

      EmployeeController.prototype.removeEmployee = function(deptid, id) {
        var removeModalView;
        this.setModel(deptid, id);
        return removeModalView = new EmployeeRemoveModalView({
          model: this.model
        });
      };

      EmployeeController.prototype.showEmployeeMaintenance = function() {
        var deps, employeeMaintenanceView;
        deps = new Departments();
        this.model.set({
          departments: deps
        });
        deps.fetch();
        employeeMaintenanceView = new EmployeeMaintenanceView({
          model: this.model
        });
        return app.adminLayoutView.contentRegion.show(employeeMaintenanceView);
      };

      EmployeeController.prototype.setModel = function(deptid, id) {
        var employees;
        this.department = this.employeesInDepartments.get(deptid);
        employees = this.department.employees;
        return this.model = this.department.employees.get(id);
      };

      return EmployeeController;

    })();
    return {
      EmployeeRouter: app.EmployeeRouter,
      EmployeeController: app.EmployeeController
    };
  });

}).call(this);
