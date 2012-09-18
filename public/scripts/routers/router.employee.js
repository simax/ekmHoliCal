(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var AdminLayoutView, AdminNavigationView, Department, Departments, Employee, EmployeeListView, EmployeeMaintenanceView, EmployeeNavigationView, Employees, EmployeesLayoutView;
    AdminLayoutView = require('../../scripts/views/view.admin.layout.js');
    AdminNavigationView = require('../../scripts/views/view.admin.navigation.menu.js');
    EmployeesLayoutView = require('../../scripts/views/view.employee.layout.js');
    EmployeeNavigationView = require('../../scripts/views/view.employee.navigation.menu.js');
    EmployeeListView = require('../../scripts/views/view.employee.list.js');
    Employees = require('../../scripts/collections/collection.employees.js');
    Employee = require('../../scripts/models/model.employee.js');
    Departments = require('../../scripts/collections/collection.departments.js');
    Department = require('../../scripts/models/model.department.js');
    EmployeeMaintenanceView = require('../../scripts/views/view.employee.maintenance.js');
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
        this.showEmployeeMaintenance = __bind(this.showEmployeeMaintenance, this);
        this.editEmployee = __bind(this.editEmployee, this);
        this.adminEmployeesEdit = __bind(this.adminEmployeesEdit, this);
        this.adminEmployeesCreate = __bind(this.adminEmployeesCreate, this);
        this.adminEmployees = __bind(this.adminEmployees, this);
        this.showAdminLayout = __bind(this.showAdminLayout, this);
        this.setupLayout = __bind(this.setupLayout, this);
      }

      EmployeeController.prototype.setupLayout = function() {
        this.adminLayoutView = new AdminLayoutView;
        this.adminLayoutView.render();
        return app.mainRegion.show(this.adminLayoutView);
      };

      EmployeeController.prototype.showAdminLayout = function() {
        this.setupLayout();
        return this.adminLayoutView.navigationRegion.show(new AdminNavigationView);
      };

      EmployeeController.prototype.adminEmployees = function() {
        var employeesLayoutView,
          _this = this;
        this.showAdminLayout();
        employeesLayoutView = new EmployeesLayoutView;
        employeesLayoutView.render();
        this.adminLayoutView.contentRegion.show(employeesLayoutView);
        employeesLayoutView.navigationRegion.show(new EmployeeNavigationView);
        this.employeesInDepartments = new Departments();
        return this.employeesInDepartments.fetch({
          success: function() {
            var employeeListView;
            employeeListView = new EmployeeListView({
              collection: _this.employeesInDepartments
            });
            return employeesLayoutView.listRegion.show(employeeListView);
          }
        });
      };

      EmployeeController.prototype.adminEmployeesCreate = function() {
        this.model = new Employee();
        return this.showEmployeeMaintenance();
      };

      EmployeeController.prototype.adminEmployeesEdit = function(deptid, id) {
        var _this = this;
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
        var employees;
        this.model = this.employeesInDepartments.get(deptid);
        this.model.set({
          employees: new Backbone.Collection(this.model.get("employees"))
        });
        employees = this.model.get("employees");
        employees.on("remove", function(m, col) {
          console.log("Model: " + m.get("lastname"));
          return m.destroy();
        });
        this.model = employees.get(id);
        this.model.urlRoot = '/ekmHoliCal/api/employees/';
        return this.showEmployeeMaintenance();
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
        this.setupLayout();
        return this.adminLayoutView.contentRegion.show(employeeMaintenanceView);
      };

      return EmployeeController;

    })();
    return {
      EmployeeRouter: app.EmployeeRouter,
      EmployeeController: app.EmployeeController
    };
  });

}).call(this);
