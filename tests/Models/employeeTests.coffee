define (require) ->
  chai = require("../chai")
  should = chai.should()
  window.Quiz = ->
    @score = 0
    @title = " "

  describe "A Quiz ", ->
    it "Should exist", ->
      new Quiz().score.should.exist

    it "Should have a default score of 0", ->
      new Quiz().score.should.equal 0

    it "Should have a blank title", ->
      new Quiz().title.should.equal " "


