define (require) ->
 
  AdminLayoutView = require '../../scripts/views/view.admin.layout.js'
  AdminNavigationView = require '../../scripts/views/view.admin.navigation.menu.js'

  EmployeesLayoutView = require '../../scripts/views/view.employee.layout.js'
  EmployeeNavigationView = require '../../scripts/views/view.employee.navigation.menu.js'
  EmployeeListView = require '../../scripts/views/view.employee.list.js'

  Employees = require '../../scripts/collections/collection.employees.js'
  Employee = require '../../scripts/models/model.employee.js'
  Departments = require '../../scripts/collections/collection.departments.js'
  Department = require '../../scripts/models/model.department.js'

  EmployeeMaintenanceView = require '../../scripts/views/view.employee.maintenance.js'

  window.app = new Backbone.Marionette.Application() unless window.app?

  class app.EmployeeRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "admin/employees": "adminEmployees"
      "admin/employees/create": "adminEmployeesCreate"
      "admin/department/:deptid/employee/edit/:id": "adminEmployeesEdit"

  class app.EmployeeController 

    setupLayout: =>
      @adminLayoutView = new AdminLayoutView
      @adminLayoutView.render()
      app.mainRegion.show(@adminLayoutView)

    showAdminLayout: =>
      @setupLayout()
      @adminLayoutView.navigationRegion.show(new AdminNavigationView)

    adminEmployees: =>
      @showAdminLayout()
      employeesLayoutView = new EmployeesLayoutView
      employeesLayoutView.render()
      @adminLayoutView.contentRegion.show(employeesLayoutView)      

      employeesLayoutView.navigationRegion.show(new EmployeeNavigationView)

      @employeesInDepartments = new Departments()  
      @employeesInDepartments.fetch
        success: =>
          employeeListView = new EmployeeListView(collection: @employeesInDepartments)
          employeesLayoutView.listRegion.show(employeeListView)

    adminEmployeesCreate: =>
      @model = new Employee()
      @showEmployeeMaintenance()

    adminEmployeesEdit: (deptid, id) =>
      if @employeesInDepartments?  
        @editEmployee(deptid, id)
      else 
        @employeesInDepartments = new Departments()
        @employeesInDepartments.fetch
          success: =>
            @editEmployee(deptid, id)

    editEmployee: (deptid, id) =>
      # @model = @employees.get(id) 
      @model = @employeesInDepartments.get(deptid)
      @model.set employees: new Backbone.Collection @model.get("employees")
      employees = @model.get("employees") 
      employees.on "remove", (m, col) ->
        console.log "Model: " + m.get("lastname")
        m.destroy()

      @model = employees.get(id)
      @model.urlRoot = '/ekmHoliCal/api/employees/'
      @showEmployeeMaintenance()

    showEmployeeMaintenance: =>  
      deps = new Departments()
      @model.set departments: deps
      deps.fetch()

      employeeMaintenanceView = new EmployeeMaintenanceView
        model: @model

      @setupLayout()  
      @adminLayoutView.contentRegion.show(employeeMaintenanceView)      
        

  EmployeeRouter: app.EmployeeRouter
  EmployeeController: app.EmployeeController
