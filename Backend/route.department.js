(function() {
  var DepartmentRoutes, DepartmentSchemaBuilder,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DepartmentSchemaBuilder = (function() {

    function DepartmentSchemaBuilder() {
      var con;
      this.mongoose = require('mongoose');
      this.schema = this.mongoose.Schema;
      this.DepartmentSchema = new this.schema({
        'name': String
      });
      this.Model = this.mongoose.model('Departments', this.DepartmentSchema);
      con = this.mongoose.connect('mongodb://localhost:8124/ekmHoliCal');
    }

    return DepartmentSchemaBuilder;

  })();

  DepartmentRoutes = (function() {

    function DepartmentRoutes() {
      this.modelBind = __bind(this.modelBind, this);
      this["delete"] = __bind(this["delete"], this);
      this.put = __bind(this.put, this);
      this.get = __bind(this.get, this);
      this.getall = __bind(this.getall, this);
      this.post = __bind(this.post, this);      this.Model = new DepartmentSchemaBuilder().Model;
    }

    DepartmentRoutes.prototype.post = function(req, res) {
      var entity;
      entity = new this.Model;
      this.modelBind(entity, req);
      entity.save(function(err) {
        if (err) console.log(err);
        if (err) return res.send(err);
      });
      return res.send(entity);
    };

    DepartmentRoutes.prototype.getall = function(req, res) {
      res.contentType('application/json');
      return this.Model.find(function(err, entity) {
        return res.send(entity);
      });
    };

    DepartmentRoutes.prototype.get = function(req, res) {
      console.log("req.params.id: " + req.params.id + "req.body.id: " + req.body.id);
      return this.Model.findById(req.params.id, function(err, entity) {
        return res.send(entity);
      });
    };

    DepartmentRoutes.prototype.put = function(req, res) {
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

    DepartmentRoutes.prototype["delete"] = function(req, res) {
      return this.Model.findById(req.params.id, function(err, entity) {
        entity.remove();
        return res.send(204);
      });
    };

    DepartmentRoutes.prototype.modelBind = function(entity, req) {
      return entity.name = req.body.name;
    };

    return DepartmentRoutes;

  })();

  module.exports = new DepartmentRoutes();

}).call(this);
