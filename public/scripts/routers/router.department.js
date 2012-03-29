(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Department, DepartmentController, DepartmentMaintenanceView, DepartmentRouter, Departments, departments;
    Departments = require('../../scripts/collections/collection.departments.js');
    Department = require('../../scripts/models/model.department.js');
    departments = new Departments();
    departments.fetch();
    DepartmentMaintenanceView = require('../../scripts/views/view.department.maintenance.js');
    DepartmentRouter = (function(_super) {

      __extends(DepartmentRouter, _super);

      function DepartmentRouter() {
        DepartmentRouter.__super__.constructor.apply(this, arguments);
      }

      DepartmentRouter.prototype.appRoutes = {
        "admin/departments/create": "adminDepartmentsCreate",
        "admin/departments/edit/:id": "adminDepartmentsEdit"
      };

      return DepartmentRouter;

    })(Backbone.Marionette.AppRouter);
    DepartmentController = (function() {

      function DepartmentController() {}

      DepartmentController.prototype.adminDepartmentsCreate = function() {
        var departmentMaintenanceView;
        departmentMaintenanceView = new DepartmentMaintenanceView({
          collection: departments,
          model: new Department()
        });
        return app.mainRegion.show(departmentMaintenanceView);
      };

      DepartmentController.prototype.adminDepartmentsEdit = function(id) {
        var departmentMaintenanceView;
        console.log("id: " + id);
        departmentMaintenanceView = new DepartmentMaintenanceView({
          collection: departments,
          model: departments.get(id)
        });
        return app.mainRegion.show(departmentMaintenanceView);
      };

      return DepartmentController;

    })();
    return {
      DepartmentRouter: DepartmentRouter,
      DepartmentController: DepartmentController
    };
  });

}).call(this);
