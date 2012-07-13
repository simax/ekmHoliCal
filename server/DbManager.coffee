class DbManager

  constructor: ->

    @mongo = require("mongodb")
    @Db = @mongo.Db
    @Connection = @mongo.Connection
    @Server = @mongo.Server

    @ServerOptions = 
      'auto_reconnect': true
      'poolSize': 5

    @server = new @Server 'localhost', 8120, @ServerOptions
    @db = new @Db 'ekmHoliCal', @server
    @db.open (err, db) =>
      @db = db


  getDb:=>    
    @db

module.exports = new DbManager().getDb()
