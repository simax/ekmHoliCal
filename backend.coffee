
require 'express-namespace'

express = require 'express'
userroutes = require './user-routes'

backend = global.backend ? express.createServer().listen process.env.PORT

basePath = '/ekmHoliCal'
 
backend.configure ->
	backend.register 'html',
		compile: (str, options) ->
			(locals) ->
				str

	backend.set 'views', __dirname + '/views'
	backend.set 'view engine', 'html'
	backend.set 'view options', layout: false
	backend.use express.bodyParser()
	backend.use backend.router
	backend.use express.static(__dirname + '/public')


# Routes

backend.namespace basePath, ->

		backend.get '/index', (req, res, next) -> res.render 'index'

		backend.namespace '/api', ->

			backend.get '/users', userroutes.getall

			backend.get '/users/:id', userroutes.get

			backend.post '/users', userroutes.post

			backend.put '/users/:id', userroutes.put

			backend.delete '/users/:id', userroutes.delete
 
