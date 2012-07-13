(function() {
  var DbManager,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DbManager = (function() {

    function DbManager() {
      this.getDb = __bind(this.getDb, this);
      var _this = this;
      this.mongo = require("mongodb");
      this.Db = this.mongo.Db;
      this.Connection = this.mongo.Connection;
      this.Server = this.mongo.Server;
      this.ServerOptions = {
        'auto_reconnect': true,
        'poolSize': 5
      };
      this.server = new this.Server('localhost', 8120, this.ServerOptions);
      this.db = new this.Db('ekmHoliCal', this.server);
      this.db.open(function(err, db) {
        return _this.db = db;
      });
    }

    DbManager.prototype.getDb = function() {
      return this.db;
    };

    return DbManager;

  })();

  module.exports = new DbManager().getDb();

}).call(this);
