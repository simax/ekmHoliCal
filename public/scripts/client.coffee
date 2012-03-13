
  require.config 
    paths:
      application:      'app'  
      jquery:           'libs/jquery-1.7.1'
      jqueryTmpl:       'libs/jquery.tmpl'
      jqueryUI:         'libs/jquery-ui-1.8.18.custom.min'
      underscore:       'libs/underscore'
      order:            'libs/order'
      backbone:         'libs/backbone'
      handlebars:       'libs/handlebars'
      bootstrap:        'libs/bootstrap/js/bootstrap'
      marionette:       'libs/backbone.marionette'
      handlebars:       'libs/backbone.modelbinding'
      validation:       'libs/backbone.validation'
      jqueryQtip:       'libs/jquery.qtip'
      utils:            'libs/utils'
      models:           'libs/models'
      collections:      'libs/collections'
      views:            'libs/views'
      jqueryDatatables: 'libs/datatables/jquery.dataTables'
      DT_bootstrap:     'libs/datatables/DT_bootstrap'

  require [
      "require"
      "jquery", 
      "order!underscore",  
      "order!backbone",  
      "order!marionette",
      "application"
  ], (application) ->

      app = new Application()
      app.start()

