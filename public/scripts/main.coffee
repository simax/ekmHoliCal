
  require.config 
    paths:
      app:                    'app'  
      jquery:                 'libs/jquery-1.7.1'
      jqueryUI:               'libs/jquery-ui-1.8.18.custom.min'
      underscore:             'libs/underscore.amd'
      order:                  'libs/order'
      backbone:               'libs/backbone.amd'
      handlebars:             'libs/handlebars'
      bootstrap:              'libs/bootstrap/js/bootstrap'
      marionette:             'libs/backbone.marionette.amd'
      modelbinder:            'libs/backbone.modelbinder'
      validation:             'libs/backbone.validation'
      jqueryQtip:             'libs/jquery.qtip'
      utils:                  'utils'
      jqueryDatatables:       'libs/datatables/jquery.dataTables'
      DT_bootstrap:           'libs/datatables/DT_bootstrap'

      # main_navigation_menu:   'templates/tmpl.main.navigation.menu'
      # main_content_region:    'templates/tmpl.main.content.region'

      admin_navigation:       'templates/tmpl.admin.navigation'
      admin_layout:           'templates/tmpl.admin.layout'

      user_grid_header:       'templates/tmpl.user.grid.header'
      user_item:              'templates/tmpl.user.item'
      user_maintenance:       'templates/tmpl.user.maintenance'
      user_navigation:        'templates/tmpl.user.navigation'
      user_layout:            'templates/tmpl.users.layout'
      
      department_grid_header: 'templates/tmpl.department.grid.header'
      department_item:        'templates/tmpl.department.item'
      department_maintenance: 'templates/tmpl.department.maintenance'
      department_navigation:  'templates/tmpl.department.navigation'
      department_layout:      'templates/tmpl.department.layout'

  require [
      "require",
      "jquery",
      "underscore",  
      "backbone",
      "marionette",
      "order!handlebars",
      "order!modelbinder",
      "order!validation",
      
      "order!jqueryDatatables",
      "order!DT_bootstrap",

      "app"
  ]
