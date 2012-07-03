# require 'coffee-script'

assert = require 'assert'
request = require 'request'
app = require '../../server'


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
    response = null
    before (done)->
      options = 
        uri: "http://localhost:1234/ekmholical/api/users"    
      request options, (err, _response, body) ->
        response = _response
        done()

    it "There is a response", ->  
      assert.ok response 

  describe "POST /api/users", ->
    response = null
    before (done)->
      options = 
        method: "POST"
        uri: "http://localhost:1234/ekmholical/api/departments"
        "content-type": "application/json"
        body: JSON.stringify
          name: "ZZZZZZZZZZZZZZZZZ"
        #   departmentId : "4fb3845f23ef714c0f000003"
        #   enddate : ""
        #   firstname : "Dave"
        #   lastname : "Sharpe"
        #   email : "davesharpe@ekmsystems.co.uk"
        #   active : false

      request options, (err, _response, body) ->
        response = _response
        done()

    it "There is a response", ->  
      assert.ok response 