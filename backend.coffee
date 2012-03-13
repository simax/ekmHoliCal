
require 'express-namespace'

express = require 'express'

userroutes = require './backend/route.user'
departmentroutes = require './backend/route.department'

backend = global.backend ? express.createServer().listen process.env.PORT

basePath = '/ekmHoliCal'
 
backend.configure ->
	backend.register 'html',
		compile: (str, options) ->
			(locals) ->
				str

	backend.set 'views', __dirname  # + '/public'
	backend.set 'view engine', 'html'
	backend.set 'view options', layout: false
	backend.use express.bodyParser()
	backend.use backend.router
	backend.use express.static(__dirname + '/public')


# API Routes

backend.namespace basePath, ->

		backend.get '/', (req, res, next) -> res.render 'index'

		backend.namespace '/api', ->

			# User routes 		
			
			backend.get '/users', userroutes.getall
			backend.get '/users/:id', userroutes.get
			backend.post '/users', userroutes.post
			backend.put '/users/:id', userroutes.put
			backend.delete '/users/:id', userroutes.delete
 
			# Department routes 		

			backend.get '/departments', departmentroutes.getall
			backend.get '/departments/:id', departmentroutes.get
			backend.post '/departments', departmentroutes.post
			backend.put '/departments/:id', departmentroutes.put
			backend.delete '/departments/:id', departmentroutes.delete
 
