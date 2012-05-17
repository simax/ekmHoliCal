(function() {
  var app, assert, request;

  assert = require('assert');

  request = require('request');

  app = require('../../backend');

  describe("My Suite Of Tests", function() {
    return describe("GET /", function() {
      var body;
      body = null;
      before(function(done) {
        var options;
        options = {
          uri: "http://localhost/ekmholical/"
        };
        return request(options, function(err, response, _body) {
          body = _body;
          return done();
        });
      });
      return it("has a 'Admin' button ", function() {
        return assert.ok(/div class/.test(body));
      });
    });
  });

}).call(this);
