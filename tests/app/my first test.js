(function() {
  var app, assert, request;

  assert = require('assert');

  request = require('request');

  app = require('../../server');

  describe("My Suite Of Tests", function() {
    return describe("PUT /api/departments", function() {
      var response;
      response = null;
      before(function(done) {
        var options;
        options = {
          method: "PUT",
          json: true,
          uri: "http://localhost:1234/ekmholical/api/departments/4fb3845f23ef714c0f000003",
          "content-type": "application/json",
          body: JSON.stringify({
            _id: "4fb3845f23ef714c0f000003",
            name: "Design",
            users: [
              {
                "_id": "4ff2db9649da545814000179",
                "_id": "4ff709ff49da545814001412"
              }
            ]
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
