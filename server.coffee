
require 'express-namespace'

express = require 'express'

_userroutes = require './server/route.user'
userroutes = new _userroutes.UserRoutes()

_departmentroutes = require './server/route.department'
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

			# User routes 		
			
			server.get '/users', userroutes.getall
			server.get '/users/:id', userroutes.get
			server.post '/users', userroutes.post
			server.put '/users/:id', userroutes.put
			server.delete '/users/:id', userroutes.delete
 
			# Department routes 		

			server.get '/departments', departmentroutes.getall
			server.get '/departments/:id', departmentroutes.get
			server.post '/departments', departmentroutes.post
			server.put '/departments/:id', departmentroutes.put
			server.delete '/departments/:id', departmentroutes.delete
 
