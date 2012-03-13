(function() {
  var UserRoutes, UserSchemaBuilder,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  UserSchemaBuilder = (function() {

    function UserSchemaBuilder() {
      var con;
      this.mongoose = require('mongoose');
      this.schema = this.mongoose.Schema;
      this.UserSchema = new this.schema({
        'firstname': {
          type: String,
          required: true
        },
        'lastname': {
          type: String,
          required: true
        },
        'email': {
          type: String,
          required: true,
          index: {
            unique: true
          },
          validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/
        },
        'department': String,
        'startdate': String,
        'enddate': String,
        'active': {
          type: Boolean,
          "default": true
        }
      });
      this.Model = this.mongoose.model('Users', this.UserSchema);
      con = this.mongoose.connect('mongodb://localhost:8124/ekmHoliCal');
    }

    return UserSchemaBuilder;

  })();

  UserRoutes = (function() {

    function UserRoutes() {
      this.modelBind = __bind(this.modelBind, this);
      this["delete"] = __bind(this["delete"], this);
      this.put = __bind(this.put, this);
      this.get = __bind(this.get, this);
      this.getall = __bind(this.getall, this);
      this.post = __bind(this.post, this);      this.Model = new UserSchemaBuilder().Model;
    }

    UserRoutes.prototype.post = function(req, res) {
      var entity;
      entity = new this.Model;
      this.modelBind(entity, req);
      entity.save(function(err) {
        if (err) console.log(err);
        if (err) return res.send(err);
      });
      return res.send(entity);
    };

    UserRoutes.prototype.getall = function(req, res) {
      res.contentType('application/json');
      return this.Model.find(function(err, entity) {
        return res.send(entity);
      });
    };

    UserRoutes.prototype.get = function(req, res) {
      console.log("req.params.id: " + req.params.id + "req.body.id: " + req.body.id);
      return this.Model.findById(req.params.id, function(err, entity) {
        return res.send(entity);
      });
    };

    UserRoutes.prototype.put = function(req, res) {
      var _this = this;
      return this.Model.findById(req.params.id, function(err, entity) {
        if (err) res.send(err);
        _this.modelBind(entity, req);
        entity.save(function(err) {
          if (err) return res.send(err);
        });
        return res.send(entity);
      });
    };

    UserRoutes.prototype["delete"] = function(req, res) {
      return this.Model.findById(req.params.id, function(err, entity) {
        entity.remove();
        return res.send(204);
      });
    };

    UserRoutes.prototype.modelBind = function(entity, req) {
      console.log("req.body.firstname: " + req.body.firstname);
      entity.firstname = req.body.firstname;
      entity.lastname = req.body.lastname;
      entity.email = req.body.email;
      entity.department = req.body.department;
      entity.startdate = req.body.startdate;
      entity.enddate = "";
      return entity.active = req.body.active;
    };

    return UserRoutes;

  })();

  module.exports = new UserRoutes();

}).call(this);
