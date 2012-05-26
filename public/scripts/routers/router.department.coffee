define (require) ->

  AdminLayoutView = require '../../scripts/views/view.admin.layout.js'
  AdminNavigationView = require '../../scripts/views/view.admin.navigation.menu.js'

  DepartmentsLayoutView = require '../../scripts/views/view.departments.layout.js'
  DepartmentNavigationView = require '../../scripts/views/view.department.navigation.menu.js'
  DepartmentListView = require '../../scripts/views/view.department.list.js'

  Departments = require '../../scripts/collections/collection.departments.js'
  Department = require '../../scripts/models/model.department.js'

  DepartmentMaintenanceView = require '../../scripts/views/view.department.maintenance.js'
 
  
  class DepartmentRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/departments": "adminDepartments"
      "admin/departments/create": "adminDepartmentsCreate"
      "admin/departments/edit/:id": "adminDepartmentsEdit"

  class DepartmentController  
    showAdminLayout: =>
      @adminLayoutView = new AdminLayoutView
      @adminLayoutView.render()
      app.mainRegion.show(@adminLayoutView)
      @adminLayoutView.navigationRegion.show(new AdminNavigationView)

    adminDepartments: =>
      @showAdminLayout()
      departmentsLayoutView = new DepartmentsLayoutView
      departmentsLayoutView.render()
      @adminLayoutView.contentRegion.show(departmentsLayoutView)      

      departmentsLayoutView.navigationRegion.show(new DepartmentNavigationView)

      @departments = new Departments()
      @departments.fetch()

      departmentListView = new DepartmentListView
        collection: @departments
        viewModel: kb.viewModel(@departments)
      
      departmentsLayoutView.listRegion.show(departmentListView)

    adminDepartmentsCreate: () =>
      model = new Department()
      departmentMaintenanceView = new DepartmentMaintenanceView
        model: model
        viewModel: kb.viewModel(model)

      @adminLayoutView.contentRegion.show(departmentMaintenanceView)   

    adminDepartmentsEdit: (id) =>
      model = @departments.get(id)
      departmentMaintenanceView = new DepartmentMaintenanceView
        model: model
        viewModel: kb.viewModel(model)

      @adminLayoutView.contentRegion.show(departmentMaintenanceView)   
      
  DepartmentRouter: DepartmentRouter
  DepartmentController: DepartmentController

