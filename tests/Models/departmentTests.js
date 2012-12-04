(function() {

  define(function(require) {
    var chai, should;
    chai = require("../chai");
    should = chai.should();
    window.Quiz = function() {
      this.score = 0;
      return this.title = " ";
    };
    return describe("A Quiz ", function() {
      it("Should exist", function() {
        return new Quiz().score.should.exist;
      });
      it("Should have a default score of 0", function() {
        return new Quiz().score.should.equal(0);
      });
      return it("Should have a blank title", function() {
        return new Quiz().title.should.equal(" ");
      });
    });
  });

}).call(this);
