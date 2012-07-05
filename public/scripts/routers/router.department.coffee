define (require) ->

  AdminLayoutView = require '../../scripts/views/view.admin.layout.js'
  AdminNavigationView = require '../../scripts/views/view.admin.navigation.menu.js'

  DepartmentsLayoutView = require '../../scripts/views/view.departments.layout.js'
  DepartmentNavigationView = require '../../scripts/views/view.department.navigation.menu.js'
  DepartmentListView = require '../../scripts/views/view.department.list.js'

  Departments = require '../../scripts/collections/collection.departments.js'
  Department = require '../../scripts/models/model.department.js'

  DepartmentMaintenanceView = require '../../scripts/views/view.department.maintenance.js'
 
  
  class app.DepartmentRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/departments": "adminDepartments"
      "admin/departments/create": "adminDepartmentsCreate"
      "admin/departments/edit/:id": "adminDepartmentsEdit"

  class app.DepartmentController  
    setupLayout: =>
      @adminLayoutView = new AdminLayoutView
      @adminLayoutView.render()
      app.mainRegion.show(@adminLayoutView)      

    showAdminLayout: =>
      @setupLayout()
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
      
      departmentsLayoutView.listRegion.show(departmentListView)

    adminDepartmentsCreate: () =>
      model = new Department()
      departmentMaintenanceView = new DepartmentMaintenanceView
        model: model

      @setupLayout()   
      @adminLayoutView.contentRegion.show(departmentMaintenanceView)   

    adminDepartmentsEdit: (id) =>
      if @departments?  
        model = @departments.get(id) 
        @editDepartment(id)
      else 
        @departments = new Departments()
        @departments.fetch
          success: =>
            @editDepartment(id)

    editDepartment: (id) =>
      model = @departments.get(id)
      departmentMaintenanceView = new DepartmentMaintenanceView
        model: model

      @setupLayout()  
      @adminLayoutView.contentRegion.show(departmentMaintenanceView)   

  DepartmentRouter: app.DepartmentRouter
  DepartmentController: app.DepartmentController
