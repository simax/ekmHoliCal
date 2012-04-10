define (require) ->

  MainView = require '../../scripts/views/view.main.js'
  
  UsersLayoutView = require '../../scripts/views/view.users.layout.js'
  UserNavigationView = require '../../scripts/views/view.user.navigation.menu.js'
  UserListView = require '../../scripts/views/view.user.list.js'
  Users = require '../../scripts/collections/collection.users.js'

  DepartmentsLayoutView = require '../../scripts/views/view.departments.layout.js'
  DepartmentNavigationView = require '../../scripts/views/view.department.navigation.menu.js'
  DepartmentListView = require '../../scripts/views/view.department.list.js'
  Departments = require '../../scripts/collections/collection.departments'

  class MainRouter extends Backbone.Marionette.AppRouter
    appRoutes: 
      "": "home",
      "admin/users": "adminUsers"
      "admin/departments": "adminDepartments"

  class MainController 
    home: () ->
      mainView = new MainView
      app.mainRegion.show(mainView)       

    adminUsers: () ->
      usersLayoutView = new UsersLayoutView
      app.mainRegion.show(usersLayoutView)      

      usersLayoutView.navigationRegion.show(new UserNavigationView)

      app.data.users = new Users()  
      app.data.users.fetch()
      userListView = new UserListView(collection: app.data.users)
      usersLayoutView.listRegion.show(userListView)


    adminDepartments: () ->
      departmentsLayoutView = new DepartmentsLayoutView
      app.mainRegion.show(departmentsLayoutView)      

      departmentsLayoutView.navigationRegion.show(new DepartmentNavigationView)

      departments = new Departments()  
      departments.fetch()
      departmentListView = new DepartmentListView(collection: departments)
      departmentsLayoutView.listRegion.show(departmentListView)


  MainRouter: MainRouter
  MainController: MainController