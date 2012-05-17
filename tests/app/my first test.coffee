# require 'coffee-script'

assert = require 'assert'
request = require 'request'
app = require '../../backend'

describe "My Suite Of Tests", ->
  describe "GET /", ->
    body = null
    before (done)->
      options = 
        uri: "http://localhost/ekmholical/"    
      request options, (err, response, _body) ->
        body = _body
        done()
    it "has a 'Admin' button ", ->  
      assert.ok /div class/.test(body) 