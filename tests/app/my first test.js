(function() {
  var app, assert, request;

  assert = require('assert');

  request = require('request');

  app = require('../../server');

  describe("My Suite Of Tests", function() {
    describe("GET /api/users", function() {
      var response;
      response = null;
      before(function(done) {
        var options;
        options = {
          uri: "http://localhost:1234/ekmholical/api/users"
        };
        return request(options, function(err, _response, body) {
          response = _response;
          return done();
        });
      });
      return it("There is a response", function() {
        return assert.ok(response);
      });
    });
    return describe("POST /api/users", function() {
      var response;
      response = null;
      before(function(done) {
        var options;
        options = {
          method: "POST",
          uri: "http://localhost:1234/ekmholical/api/departments",
          "content-type": "application/json",
          body: JSON.stringify({
            name: "ZZZZZZZZZZZZZZZZZ"
          })
        };
        return request(options, function(err, _response, body) {
          response = _response;
          return done();
        });
      });
      return it("There is a response", function() {
        return assert.ok(response);
      });
    });
  });

}).call(this);
