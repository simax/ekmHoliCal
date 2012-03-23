(function() {

  require.config({
    paths: {
      app: 'app',
      jquery: 'libs/jquery-1.7.1',
      jqueryTmpl: 'libs/jquery.tmpl',
      jqueryUI: 'libs/jquery-ui-1.8.18.custom.min',
      underscore: 'libs/underscore.amd',
      order: 'libs/order',
      backbone: 'libs/backbone.amd',
      handlebars: 'libs/handlebars',
      bootstrap: 'libs/bootstrap/js/bootstrap',
      marionette: 'libs/backbone.marionette',
      modelbinding: 'libs/backbone.modelbinding',
      validation: 'libs/backbone.validation',
      jqueryQtip: 'libs/jquery.qtip',
      utils: 'libs/utils',
      models: 'libs/models',
      collections: 'libs/collections',
      views: 'libs/views',
      jqueryDatatables: 'libs/datatables/jquery.dataTables',
      DT_bootstrap: 'libs/datatables/DT_bootstrap'
    }
  });

  require(["require", "jquery", "underscore", "backbone", "order!jqueryTmpl", "order!marionette", "order!validation", "app"]);

}).call(this);
