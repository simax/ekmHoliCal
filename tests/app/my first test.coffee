# require 'coffee-script'

assert = require 'assert'
request = require 'request'
app = require '../../backend'

describe "My Suite Of Tests", ->
  # describe "GET /", ->
  #   body = null
  #   before (done)->
  #     options = 
  #       uri: "http://localhost/ekmholical/"    
  #     request options, (err, response, _body) ->
  #       body = _body
  #       done()
  #   it "has a 'Admin' button ", ->  
  #     assert.ok /div class/.test(body)
  
  describe "GET /api/users", ->
    before (done)->
      response = null
      options = 
        uri: "http://localhost/ekmholical/api/users"    
      request options, (err, _response, body) ->
        response = _response
        done()
    it "There is a response", ->  
      assert.ok response 