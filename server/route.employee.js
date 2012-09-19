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
      this.put = __bind(this.put, this);      this.Model = global.schemas.DepartmentSchemaModel;
    }

    EmployeeRoutes.prototype.put = function(req, res) {
      var _this = this;
      return this.Model.findOne({
        'employees._id': req.params.id
      }, function(err, department) {
        var entity;
        if (err) res.send(err);
        if (department == null) res.send(404);
        entity = department.employees.id(req.params.id);
        _this.modelBind(entity, req);
        return department.save(function(err) {
          if (err) console.log(err);
          if (err) res.send(err);
          return res.send(200);
        });
      });
    };

    EmployeeRoutes.prototype.post = function(req, res) {
      var _this = this;
      return this.Model.findOne({
        '_id': req.body.departmentId
      }, function(err, department) {
        var employee;
        if (err) res.send(err);
        if (department == null) res.send(404);
        employee = new global.schemas.EmployeeSchemaModel();
        _this.modelBind(employee, req);
        department.employees.addToSet(employee);
        return department.save(function(err) {
          return _this.respond(employee, res, err);
        });
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
      return this.Model.findOne({
        'employees._id': req.params.id
      }, function(err, entity) {
        var _this = this;
        entity.employees.id(req.params.id).remove();
        console.log(entity);
        return entity.save(function(err) {
          if (err) res.send(err);
          return res.send(200);
        });
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

    EmployeeRoutes.prototype.respond = function(entity, res, err) {
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
