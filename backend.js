(function() {
  var backend, basePath, express, userroutes, _ref;

  require('express-namespace');

  express = require('express');

  userroutes = require('./user-routes');

  backend = (_ref = global.backend) != null ? _ref : express.createServer().listen(process.env.PORT);

  basePath = '/ekmHoliCal';

  backend.configure(function() {
    backend.register('html', {
      compile: function(str, options) {
        return function(locals) {
          return str;
        };
      }
    });
    backend.set('views', __dirname + '/views');
    backend.set('view engine', 'html');
    backend.set('view options', {
      layout: false
    });
    backend.use(express.bodyParser());
    backend.use(backend.router);
    return backend.use(express.static(__dirname + '/public'));
  });

  backend.namespace(basePath, function() {
    backend.get('/index', function(req, res, next) {
      return res.render('index');
    });
    return backend.namespace('/api', function() {
      backend.get('/users', userroutes.getall);
      backend.get('/users/:id', userroutes.get);
      backend.post('/users', userroutes.post);
      backend.put('/users/:id', userroutes.put);
      return backend["delete"]('/users/:id', userroutes["delete"]);
    });
  });

}).call(this);
