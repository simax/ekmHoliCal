(function() {
  var basePath, departmentroutes, express, server, userroutes, _dbmanager, _departmentroutes, _ref, _userroutes;

  require('express-namespace');

  express = require('express');

  _userroutes = require('./server/route.user');

  userroutes = new _userroutes.UserRoutes();

  _departmentroutes = require('./server/route.department');

  departmentroutes = new _departmentroutes.DepartmentRoutes();

  server = module.exports = (_ref = global.server) != null ? _ref : express.createServer().listen(1234);

  _dbmanager = require('./server/DbManager.js');

  global.dbmanager = new _dbmanager.DbManager();

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
      server.get('/users', userroutes.getall);
      server.get('/users/:id', userroutes.get);
      server.post('/users', userroutes.post);
      server.put('/users/:id', userroutes.put);
      server["delete"]('/users/:id', userroutes["delete"]);
      server.get('/departments', departmentroutes.getall);
      server.get('/departments/:id', departmentroutes.get);
      server.post('/departments', departmentroutes.post);
      server.put('/departments/:id', departmentroutes.put);
      return server["delete"]('/departments/:id', departmentroutes["delete"]);
    });
  });

}).call(this);
