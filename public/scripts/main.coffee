
  require.config 
    paths:
      app:                    'app'  
      jquery:                 'libs/jquery-1.7.1'
      jqueryTmpl:             'libs/jquery.tmpl'
      jqueryUI:               'libs/jquery-ui-1.8.18.custom.min'
      underscore:             'libs/underscore.amd'
      order:                  'libs/order'
      backbone:               'libs/backbone.amd'
      handlebars:             'libs/handlebars'
      bootstrap:              'libs/bootstrap/js/bootstrap'
      marionette:             'libs/backbone.marionette'
      modelbinding:           'libs/backbone.modelbinding'
      validation:             'libs/backbone.validation'
      jqueryQtip:             'libs/jquery.qtip'
      utils:                  'utils'
      jqueryDatatables:       'libs/datatables/jquery.dataTables'
      DT_bootstrap:           'libs/datatables/DT_bootstrap'

      main_navigation_menu:   'templates/tmpl.main.navigation.menu'
      main_region:            'templates/tmpl.main.region'
      user_grid_header:       'templates/tmpl.user.grid.header'
      user_item:              'templates/tmpl.user.item'
      user_maintenance:       'templates/tmpl.user.maintenance'
      user_navigation:        'templates/tmpl.user.navigation'
      user_layout:            'templates/tmpl.users.layout'
      department_maintenance: 'templates/tmpl.department.maintenance'


  require [
      "require",
      "jquery",
      "underscore",  
      "backbone",  
      "order!jqueryTmpl",
      "order!marionette",
      "order!validation",
      "app"
  ]
