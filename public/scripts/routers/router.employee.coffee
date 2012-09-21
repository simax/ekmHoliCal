define (require) ->
 
  EmployeesLayoutView = require '../../scripts/views/view.employee.layout.js'
  EmployeeNavigationView = require '../../scripts/views/view.employee.navigation.menu.js'
  EmployeeListView = require '../../scripts/views/view.employee.list.js'

  Employees = require '../../scripts/collections/collection.employees.js'
  Employee = require '../../scripts/models/model.employee.js'
  Departments = require '../../scripts/collections/collection.departments.js'
  Department = require '../../scripts/models/model.department.js'
 
  EmployeeMaintenanceView = require '../../scripts/views/view.employee.maintenance.js'
  EmployeeRemoveModalView = require '../../scripts/views/view.employee.remove.modal.js'

  window.app = new Backbone.Marionette.Application() unless window.app?

  class app.EmployeeRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/employees": "adminEmployees"
      "admin/employees/create": "adminEmployeesCreate"
      "admin/department/:deptid/employee/edit/:id": "adminEmployeesEdit"

  class app.EmployeeController 

    adminEmployees: =>
      app.addAdminLayout()
      app.employeesLayoutView = new EmployeesLayoutView()

      app.adminLayoutView.contentRegion.show(app.employeesLayoutView)      
      app.employeesLayoutView.navigationRegion.show(new EmployeeNavigationView)

      @employeesInDepartments = new Departments()  
      @employeesInDepartments.fetch
        success: =>
          employeeListView = new EmployeeListView(collection: @employeesInDepartments)
          app.employeesLayoutView.listRegion.show(employeeListView)

    adminEmployeesCreate: =>
      @model = new Employee()
      @showEmployeeMaintenance()

    adminEmployeesEdit: (deptid, id) =>
      app.adminLayoutView.navigationRegion.close()
      if @employeesInDepartments?  
        @editEmployee(deptid, id)
      else 
        @employeesInDepartments = new Departments()
        @employeesInDepartments.fetch
          success: =>
            @editEmployee(deptid, id)

    editEmployee: (deptid, id) =>
      @setModel deptid, id
      @showEmployeeMaintenance()

    adminEmployeesRemove: (deptid, id) =>
      if @employeesInDepartments?  
        @removeEmployee(deptid, id)
      else 
        @employeesInDepartments = new Departments()
        @employeesInDepartments.fetch
          success: =>
            @removeEmployee(deptid, id)  


    removeEmployee: (deptid, id) =>  
      @setModel deptid, id

      removeModalView = new EmployeeRemoveModalView(model: @model)
      # employeesLayoutView = new EmployeesLayoutView
      # employeesLayoutView.render()

      # app.adminLayoutView.contentRegion.show(employeesLayoutView)      

      
  

    showEmployeeMaintenance: =>  
      # departments for dropdown
      deps = new Departments()
      @model.set departments: deps
      deps.fetch()

      employeeMaintenanceView = new EmployeeMaintenanceView(model: @model)

      app.adminLayoutView.contentRegion.show(employeeMaintenanceView)      
        
    setModel: (deptid, id) => 
      @department = @employeesInDepartments.get(deptid)
      employees = @department.employees
      @model = @department.employees.get(id)
  


  EmployeeRouter: app.EmployeeRouter
  EmployeeController: app.EmployeeController
