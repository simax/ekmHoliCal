(function() {
  var UserRoutes, db, dbMan, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  dbMan = require('./DbManager.js');

  db = dbMan.db;

  _ = require('../public/scripts/libs/underscore.amd.js');

  UserRoutes = (function() {

    function UserRoutes() {
      this.modelBind = __bind(this.modelBind, this);
      this["delete"] = __bind(this["delete"], this);
      this.put = __bind(this.put, this);
      this.get = __bind(this.get, this);
      this.getall = __bind(this.getall, this);
      this.post = __bind(this.post, this);
    }

    UserRoutes.prototype.post = function(req, res) {
      var entity,
        _this = this;
      entity = new this.Model;
      this.modelBind(entity, req);
      return entity.save(function(err) {
        return _this.save(entity, res, err);
      });
    };

    UserRoutes.prototype.getall = function(req, res) {
      return db.collection("departments", function(err, collection) {
        if (err) console.log(err);
        if (err) re.send(err);
        return collection.find().toArray(function(err, docs) {
          return res.send(docs);
        });
      });
    };

    UserRoutes.prototype.get = function(req, res) {
      return this.Model.findById(req.params.id).run(function(err, entity) {
        return res.send(entity);
      });
    };

    UserRoutes.prototype.put = function(req, res) {
      var entity;
      entity = {};
      this.modelBind(entity, req);
      return db.collection("departments").find({
        "users._id": entity._id
      }).limit(1).nextObject(function(err, doc) {
        if (err) return;
        return _.each(doc.users, function(userdoc) {
          if (userdoc._id.toString() === req.body._id) {
            if (userdoc.departmentId.toString() !== entity.departmentId.toString()) {
              console.log("User id to move: " + userdoc._id);
              console.log("DepartmentId to move to: " + entity.departmentId);
              db.collection("departments").update({
                "users._id": entity._id,
                "$atomic": "true"
              }, {
                $pull: {
                  'users': {
                    "_id": entity._id
                  }
                }
              });
              delete entity._id;
              return db.collection("departments").update({
                "_id": entity.departmentId,
                "$atomic": "true"
              }, {
                $addToSet: {
                  'users': entity
                }
              });
            } else {
              console.log("lastname : " + entity.lastname);
              return db.collection("departments").update({
                "users._id": entity.userid
              }, {
                $set: {
                  "users.$.firstname": entity.firstname,
                  "users.$.lastname": entity.lastname,
                  "users.$.email": entity.email,
                  "users.$.enddate": entity.enddate,
                  "users.$.active": entity.active,
                  "users.$.departmentId": entity.departmentId
                }
              }, false, false);
            }
          }
        });
      });
    };

    UserRoutes.prototype["delete"] = function(req, res) {
      return this.Model.findById(req.params.id, function(err, entity) {
        entity.remove();
        return res.send(204);
      });
    };

    UserRoutes.prototype.modelBind = function(entity, req) {
      entity._id = new dbMan.ObjectID(req.body._id);
      entity.firstname = req.body.firstname;
      entity.lastname = req.body.lastname;
      entity.email = req.body.email;
      entity.enddate = req.body.enddate;
      entity.active = req.body.active;
      return entity.departmentId = new dbMan.ObjectID(req.body.departmentId);
    };

    UserRoutes.prototype.save = function(entity, res, err) {
      if (err) {
        console.log(err);
        if (err.code = 1101) {
          res.send("Unable to save", 400);
          return;
        }
        return res.send("Unable to process request", 500);
      } else {
        return res.send(entity);
      }
    };

    return UserRoutes;

  })();

  exports.UserRoutes = UserRoutes;

}).call(this);
