(function() {
  var DepartmentRoutes, dbMan,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  dbMan = require('./DbManager');

  DepartmentRoutes = (function() {

    function DepartmentRoutes() {
      this.modelBind = __bind(this.modelBind, this);
      this["delete"] = __bind(this["delete"], this);
      this.put = __bind(this.put, this);
      this.get = __bind(this.get, this);
      this.getall = __bind(this.getall, this);
      this.post = __bind(this.post, this);
    }

    DepartmentRoutes.prototype.post = function(req, res) {
      var _this = this;
      return entity.save(function(err) {
        return _this.save(entity, res, err);
      });
    };

    DepartmentRoutes.prototype.getall = function(req, res) {
      return dbMan.db.collection("departments", function(err, collection) {
        if (err) console.log(err);
        if (err) re.send(err);
        return collection.find().toArray(function(err, docs) {
          return res.send(docs);
        });
      });
    };

    DepartmentRoutes.prototype.get = function(req, res) {
      var _this = this;
      return dbMan.db.collection("departments").find({
        "_id": req.params.id
      }, function(err, doc) {
        if (err) res.send(err);
        return res.send(doc);
      });
    };

    DepartmentRoutes.prototype.put = function(req, res) {
      var entity;
      entity = {};
      this.modelBind(entity, req);
      return dbMan.db.collection("departments").update({
        "_id": entity._id
      }, entity, false);
    };

    DepartmentRoutes.prototype["delete"] = function(req, res) {
      return this.Model.findById(req.params.id, function(err, entity) {
        entity.remove();
        return res.send(204);
      });
    };

    DepartmentRoutes.prototype.modelBind = function(entity, req) {
      entity._id = new dbMan.ObjectID(req.body._id);
      entity.name = req.body.name;
      return entity.users = req.body.users;
    };

    DepartmentRoutes.prototype.save = function(entity, res, err) {
      if (err) {
        console.log(err);
        if (err.code = 1101) {
          res.send("Already exists", 400);
          return;
        }
        return res.send("Unable to process request", 500);
      } else {
        return res.send(entity);
      }
    };

    return DepartmentRoutes;

  })();

  exports.DepartmentRoutes = DepartmentRoutes;

}).call(this);
