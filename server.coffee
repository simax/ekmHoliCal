
require 'express-namespace'

express = require 'express'

_schemas = require('./server/schemas')
global.schemas = new _schemas()

_employeeroutes = require('./server/route.employee')
employeeroutes = new _employeeroutes.EmployeeRoutes()

_departmentroutes = require('./server/route.department')
departmentroutes = new _departmentroutes.DepartmentRoutes()

server = module.exports = global.server ? express.createServer().listen 1234

basePath = '/ekmHoliCal'
 
server.configure ->
  server.register 'html',
    compile: (str, options) ->
      (locals) ->
        str

  server.set 'views', __dirname  + '/public'
  server.set 'view engine', 'html'
  server.set 'view options', layout: false
  server.use express.bodyParser()
  server.use server.router
  server.use express.static(__dirname + '/public')

# API Routes
 
server.namespace basePath, ->

  server.get '/', (req, res, next) -> res.render 'index'

  server.namespace '/api', ->

    # Employee routes
    
    server.get '/employees', employeeroutes.getall
    server.get '/employees/:id', employeeroutes.get
    server.post '/employees', employeeroutes.post
    server.put '/employees/:id', employeeroutes.put
    server.delete '/employees/:id', employeeroutes.delete


    # Department routes

    server.get '/departments', departmentroutes.getall
    server.get '/departments/:id', departmentroutes.get
    server.post '/departments', departmentroutes.post
    server.put '/departments/:id', departmentroutes.put
    server.delete '/departments/:id', departmentroutes.delete

