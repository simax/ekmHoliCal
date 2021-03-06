
  require.config 
    paths:
      app:                    'app'  
      jquery:                 'libs/jquery-1.7.1'
      jqueryUI:               'libs/jquery-ui-1.8.18.custom.min'
      underscore:             'libs/underscore'

      backbone:               'libs/backbone'
      handlebars:             'libs/handlebars'
      bootstrap:              'libs/bootstrap/js/bootstrap'
      marionette:             'libs/backbone.marionette'
      modelbinder:            'libs/backbone.modelbinder'
      validation:             'libs/backbone.validation'
      jqueryQtip:             'libs/jquery.qtip'
      select2:                'libs/select2'
      utils:                  'utils'

      admin_navigation:       'templates/tmpl.admin.navigation'
      admin_layout:           'templates/tmpl.admin.layout'

      employee_department_header: 'templates/tmpl.employee.department.header'
      employee_list_empty:        'templates/tmpl.employee.list.empty'
      employee_item:              'templates/tmpl.employee.item'
      employee_maintenance:       'templates/tmpl.employee.maintenance'
      employee_navigation:        'templates/tmpl.employee.navigation'
      employee_layout:            'templates/tmpl.employees.layout'
      employee_remove_modal:      'templates/tmpl.employee.remove.modal'
       
      department_grid_header: 'templates/tmpl.department.grid.header'
      department_item:        'templates/tmpl.department.item'
      department_maintenance: 'templates/tmpl.department.maintenance'
      department_navigation:  'templates/tmpl.department.navigation'
      department_layout:      'templates/tmpl.department.layout'
      shim:
        backbone:
          deps:         ["underscore", "jquery"]
          exports:      "Backbone"
        underscore:
          exports: "_"    

        marionette:     ["backbone"]
        modelbinder:    ["backbone"]
        validation:     ["backbone"]
        jqueryUI:       ["jquery"]    
        jqueryQtip:     ["jquery"]  

  require [
      "require",
      "jquery",
      "underscore",  
      "backbone",
      "marionette",
      "handlebars",
      "modelbinder",
      "validation",

      "app"
  ]
