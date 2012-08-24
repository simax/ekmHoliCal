class DbManager

  constructor: ->

    @mongo = require("mongodb")
    @Db = @mongo.Db
    @Server = @mongo.Server
    @ObjectID = @mongo.ObjectID

    @ServerOptions = 
      'auto_reconnect': true
      'poolSize': 5

    @server = new @Server 'localhost', 8120, @ServerOptions
    @db = new @Db 'ekmHoliCal', @server
    @db.open (err, db) =>
      @db = db

  db:=>    
    @db

  ObjectID: =>   
    @ObjectID 

module.exports = new DbManager()
