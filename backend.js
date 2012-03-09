(function() {
  var backend, basePath, departmentroutes, express, userroutes, _ref;

  require('express-namespace');

  express = require('express');

  userroutes = require('./user-routes');

  departmentroutes = require('./department-routes');

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
    backend.get('/', function(req, res, next) {
      return res.render('index');
    });
    return backend.namespace('/api', function() {
      backend.get('/users', userroutes.getall);
      backend.get('/users/:id', userroutes.get);
      backend.post('/users', userroutes.post);
      backend.put('/users/:id', userroutes.put);
      backend["delete"]('/users/:id', userroutes["delete"]);
      backend.get('/departments', departmentroutes.getall);
      backend.get('/departments/:id', departmentroutes.get);
      backend.post('/departments', departmentroutes.post);
      backend.put('/departments/:id', departmentroutes.put);
      return backend["delete"]('/departments/:id', departmentroutes["delete"]);
    });
  });

}).call(this);
