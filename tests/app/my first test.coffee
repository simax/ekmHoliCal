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
  
  # describe "GET /api/employees", ->
  #   response = null
  #   before (done)->
  #     options = 
  #       uri: "http://localhost:1234/ekmholical/api/employees"    
  #     request options, (err, _response, body) ->
  #       response = _response
  #       done()

  #   it "There is a response", ->  
  #     assert.ok response 

  # describe "POST /api/employees", ->
  #   response = null
  #   before (done)->
  #     options = 
  #       method: "POST"
  #       json:true
  #       uri: "http://localhost:1234/ekmholical/api/employees"
  #       "content-type": "application/json"
  #       body: JSON.stringify
  #         departmentId : "4fb3845f23ef714c0f000003"
  #         enddate : ""
  #         firstname : "Dave"
  #         lastname : "Sharpe"
  #         email : "davesharpe@ekmsystems.co.uk"
  #         active : false

  #     request options, (err, _response, body) ->
  #       response = _response
  #       done()

  #   it "There is a response", ->  
  #     assert.ok response 

  describe "PUT /api/departments", ->
    response = null
    before (done)->
      options = 
        method: "PUT"
        json:true
        uri: "http://localhost:1234/ekmholical/api/departments/4fb3845f23ef714c0f000003"
        "content-type": "application/json"
        body: JSON.stringify
          _id : "4fb3845f23ef714c0f000003"
          name : "Design"
          employees:
            [
              "_id" : "4ff2db9649da545814000179",
              "_id" : "4ff709ff49da545814001412"
            ]

      request options, (err, _response, body) ->
        response = _response
        done()

    it "There is a response", ->  
      assert.ok response 