(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentController, DepartmentRouter;
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
    return DepartmentController = (function() {

      function DepartmentController() {}

      DepartmentController.prototype.adminDepartmentsCreate = function() {
        var userMaintenanceView;
        userMaintenanceView = new this.DepartmentMaintenanceView({
          collection: this.departments,
          model: new this.Department()
        });
        return this.mainRegion.show(departmentMaintenanceView);
      };

      DepartmentController.prototype.adminDepartmentsEdit = function(id) {
        var departmentMaintenanceView;
        console.log("id: " + id);
        departmentMaintenanceView = new this.DepartmentMaintenanceView({
          collection: this.departments,
          model: this.departments.get(id)
        });
        return this.mainRegion.show(departmentMaintenanceView);
      };

      return DepartmentController;

    })();
  });

  ({
    DepartmentRouter: DepartmentRouter,
    DepartmentController: DepartmentController
  });

}).call(this);
