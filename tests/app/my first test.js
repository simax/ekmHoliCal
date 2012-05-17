(function() {
  var app, assert, request;

  assert = require('assert');

  request = require('request');

  app = require('../../backend');

  describe("My Suite Of Tests", function() {
    return describe("GET /api/users", function() {
      before(function(done) {
        var options, response;
        response = null;
        options = {
          uri: "http://localhost/ekmholical/api/users"
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
