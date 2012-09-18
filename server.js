(function() {
  var basePath, departmentroutes, employeeroutes, express, server, _departmentroutes, _employeeroutes, _ref, _schemas;

  require('express-namespace');

  express = require('express');

  _schemas = require('./server/schemas');

  global.schemas = new _schemas();

  _employeeroutes = require('./server/route.employee');

  employeeroutes = new _employeeroutes.EmployeeRoutes();

  _departmentroutes = require('./server/route.department');

  departmentroutes = new _departmentroutes.DepartmentRoutes();

  server = module.exports = (_ref = global.server) != null ? _ref : express.createServer().listen(1234);

  basePath = '/ekmHoliCal';

  server.configure(function() {
    server.register('html', {
      compile: function(str, options) {
        return function(locals) {
          return str;
        };
      }
    });
    server.set('views', __dirname + '/public');
    server.set('view engine', 'html');
    server.set('view options', {
      layout: false
    });
    server.use(express.bodyParser());
    server.use(server.router);
    return server.use(express.static(__dirname + '/public'));
  });

  server.namespace(basePath, function() {
    server.get('/', function(req, res, next) {
      return res.render('index');
    });
    return server.namespace('/api', function() {
      server.get('/employees', employeeroutes.getall);
      server.get('/employees/:id', employeeroutes.get);
      server.post('/employees', employeeroutes.post);
      server.put('/employees/:id', employeeroutes.put);
      server["delete"]('/employees/:id', employeeroutes["delete"]);
      server.get('/departments', departmentroutes.getall);
      server.get('/departments/:id', departmentroutes.get);
      server.post('/departments', departmentroutes.post);
      server.put('/departments/:id', departmentroutes.put);
      return server["delete"]('/departments/:id', departmentroutes["delete"]);
    });
  });

}).call(this);
