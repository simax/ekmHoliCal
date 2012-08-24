(function() {
  var DbManager,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DbManager = (function() {

    function DbManager() {
      this.ObjectID = __bind(this.ObjectID, this);
      this.db = __bind(this.db, this);
      var _this = this;
      this.mongo = require("mongodb");
      this.Db = this.mongo.Db;
      this.Server = this.mongo.Server;
      this.ObjectID = this.mongo.ObjectID;
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

    DbManager.prototype.db = function() {
      return this.db;
    };

    DbManager.prototype.ObjectID = function() {
      return this.ObjectID;
    };

    return DbManager;

  })();

  module.exports = new DbManager();

}).call(this);
