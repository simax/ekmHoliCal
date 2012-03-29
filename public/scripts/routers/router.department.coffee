define (require) ->

  Departments = require '../../scripts/collections/collection.departments.js'
  Department = require '../../scripts/models/model.department.js'

  departments = new Departments()
  departments.fetch()

  DepartmentMaintenanceView = require '../../scripts/views/view.department.maintenance.js'
 
  class DepartmentRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/departments/create": "adminDepartmentsCreate"
      "admin/departments/edit/:id": "adminDepartmentsEdit"

  class DepartmentController  
    adminDepartmentsCreate: () ->
      departmentMaintenanceView = new DepartmentMaintenanceView
        collection: departments
        model: new Department()

      app.mainRegion.show(departmentMaintenanceView)

    adminDepartmentsEdit: (id) ->
      console.log "id: " + id
      departmentMaintenanceView = new DepartmentMaintenanceView
        collection: departments
        model: departments.get(id)

      app.mainRegion.show(departmentMaintenanceView)

  DepartmentRouter: DepartmentRouter
  DepartmentController: DepartmentController

