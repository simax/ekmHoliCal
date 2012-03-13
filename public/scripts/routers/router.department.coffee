define (require) ->
 
  class DepartmentRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/departments/create": "adminDepartmentsCreate"
      "admin/departments/edit/:id": "adminDepartmentsEdit"

  class DepartmentController  
    adminDepartmentsCreate: () ->
      userMaintenanceView = new @DepartmentMaintenanceView
        collection: @departments
        model: new @Department()

      @mainRegion.show(departmentMaintenanceView)

    adminDepartmentsEdit: (id) ->
      console.log "id: " + id
      departmentMaintenanceView = new @DepartmentMaintenanceView
        collection: @departments
        model: @departments.get(id)

      @mainRegion.show(departmentMaintenanceView)

DepartmentRouter: DepartmentRouter
DepartmentController: DepartmentController

