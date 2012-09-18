(function() {
  var EmployeeRoutes,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  EmployeeRoutes = (function() {

    function EmployeeRoutes() {
      this.modelBind = __bind(this.modelBind, this);
      this["delete"] = __bind(this["delete"], this);
      this.get = __bind(this.get, this);
      this.getall = __bind(this.getall, this);
      this.post = __bind(this.post, this);
      this.put = __bind(this.put, this);      this.Model = global.schemas.EmployeeSchemaModel;
    }

    EmployeeRoutes.prototype.put = function(req, res) {
      var _this = this;
      return this.Model.findById(req.params.id, function(err, entity) {
        _this.modelBind(entity, req);
        return entity.save(function(err) {
          return _this.save(entity, res, err);
        });
      });
    };

    EmployeeRoutes.prototype.post = function(req, res) {
      var entity,
        _this = this;
      entity = new this.Model;
      this.modelBind(entity, req);
      return entity.save(function(err) {
        return _this.save(entity, res, err);
      });
    };

    EmployeeRoutes.prototype.getall = function(req, res) {
      res.contentType('application/json');
      return this.Model.find().exec(function(err, data) {
        if (err) res.send(err);
        return res.send(data);
      });
    };

    EmployeeRoutes.prototype.get = function(req, res) {
      return this.Model.findById(req.params.id).run(function(err, entity) {
        return res.send(entity);
      });
    };

    EmployeeRoutes.prototype["delete"] = function(req, res) {
      return this.Model.findById(req.params.id, function(err, entity) {
        entity.remove();
        return res.send(204);
      });
    };

    EmployeeRoutes.prototype.modelBind = function(entity, req) {
      entity.firstname = req.body.firstname;
      entity.lastname = req.body.lastname;
      entity.email = req.body.email;
      entity.enddate = req.body.enddate;
      entity.active = req.body.active;
      return entity.departmentId = req.body.departmentId;
    };

    EmployeeRoutes.prototype.save = function(entity, res, err) {
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

    return EmployeeRoutes;

  })();

  exports.EmployeeRoutes = EmployeeRoutes;

}).call(this);
