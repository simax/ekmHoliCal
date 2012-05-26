(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var AdminLayoutView, AdminNavigationView, Department, DepartmentController, DepartmentListView, DepartmentMaintenanceView, DepartmentNavigationView, DepartmentRouter, Departments, DepartmentsLayoutView;
    AdminLayoutView = require('../../scripts/views/view.admin.layout.js');
    AdminNavigationView = require('../../scripts/views/view.admin.navigation.menu.js');
    DepartmentsLayoutView = require('../../scripts/views/view.departments.layout.js');
    DepartmentNavigationView = require('../../scripts/views/view.department.navigation.menu.js');
    DepartmentListView = require('../../scripts/views/view.department.list.js');
    Departments = require('../../scripts/collections/collection.departments.js');
    Department = require('../../scripts/models/model.department.js');
    DepartmentMaintenanceView = require('../../scripts/views/view.department.maintenance.js');
    DepartmentRouter = (function(_super) {

      __extends(DepartmentRouter, _super);

      function DepartmentRouter() {
        DepartmentRouter.__super__.constructor.apply(this, arguments);
      }

      DepartmentRouter.prototype.appRoutes = {
        "admin/departments": "adminDepartments",
        "admin/departments/create": "adminDepartmentsCreate",
        "admin/departments/edit/:id": "adminDepartmentsEdit"
      };

      return DepartmentRouter;

    })(Backbone.Marionette.AppRouter);
    DepartmentController = (function() {

      function DepartmentController() {
        this.adminDepartmentsEdit = __bind(this.adminDepartmentsEdit, this);
        this.adminDepartmentsCreate = __bind(this.adminDepartmentsCreate, this);
        this.adminDepartments = __bind(this.adminDepartments, this);
        this.showAdminLayout = __bind(this.showAdminLayout, this);
      }

      DepartmentController.prototype.showAdminLayout = function() {
        this.adminLayoutView = new AdminLayoutView;
        this.adminLayoutView.render();
        app.mainRegion.show(this.adminLayoutView);
        return this.adminLayoutView.navigationRegion.show(new AdminNavigationView);
      };

      DepartmentController.prototype.adminDepartments = function() {
        var departmentListView, departmentsLayoutView;
        this.showAdminLayout();
        departmentsLayoutView = new DepartmentsLayoutView;
        departmentsLayoutView.render();
        this.adminLayoutView.contentRegion.show(departmentsLayoutView);
        departmentsLayoutView.navigationRegion.show(new DepartmentNavigationView);
        this.departments = new Departments();
        this.departments.fetch();
        departmentListView = new DepartmentListView({
          collection: this.departments,
          viewModel: kb.viewModel(this.departments)
        });
        return departmentsLayoutView.listRegion.show(departmentListView);
      };

      DepartmentController.prototype.adminDepartmentsCreate = function() {
        var departmentMaintenanceView, model;
        model = new Department();
        departmentMaintenanceView = new DepartmentMaintenanceView({
          model: model,
          viewModel: kb.viewModel(model)
        });
        return this.adminLayoutView.contentRegion.show(departmentMaintenanceView);
      };

      DepartmentController.prototype.adminDepartmentsEdit = function(id) {
        var departmentMaintenanceView, model;
        model = this.departments.get(id);
        departmentMaintenanceView = new DepartmentMaintenanceView({
          model: model,
          viewModel: kb.viewModel(model)
        });
        return this.adminLayoutView.contentRegion.show(departmentMaintenanceView);
      };

      return DepartmentController;

    })();
    return {
      DepartmentRouter: DepartmentRouter,
      DepartmentController: DepartmentController
    };
  });

}).call(this);
