(function() {
  var DepartmentRoutes,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DepartmentRoutes = (function() {

    function DepartmentRoutes() {
      this.modelBind = __bind(this.modelBind, this);
      this["delete"] = __bind(this["delete"], this);
      this.put = __bind(this.put, this);
      this.get = __bind(this.get, this);
      this.getall = __bind(this.getall, this);
      this.post = __bind(this.post, this);
      var Schemas;
      Schemas = require('./schemas');
      this.Model = new Schemas.DepartmentSchemaBuilder().Model;
    }

    DepartmentRoutes.prototype.post = function(req, res) {
      var entity,
        _this = this;
      entity = new this.Model;
      this.modelBind(entity, req);
      return entity.save(function(err) {
        return _this.save(entity, res, err);
      });
    };

    DepartmentRoutes.prototype.getall = function(req, res) {
      return this.Model.find().populate('users').run(function(err, entity) {
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
        _this.modelBind(entity, req);
        return entity.save(function(err) {
          return _this.save(entity, res, err);
        });
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