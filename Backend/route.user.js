(function() {
  var UserRoutes,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  UserRoutes = (function() {

    function UserRoutes() {
      this.modelBind = __bind(this.modelBind, this);
      this["delete"] = __bind(this["delete"], this);
      this.put = __bind(this.put, this);
      this.get = __bind(this.get, this);
      this.getall = __bind(this.getall, this);
      this.post = __bind(this.post, this);      this.Schemas = require('./schemas');
      this.DepartmentModel = new this.Schemas.DepartmentSchemaBuilder().Model;
      this.Model = new this.Schemas.UserSchemaBuilder().Model;
    }

    UserRoutes.prototype.post = function(req, res) {
      var entity,
        _this = this;
      entity = new this.Model;
      return this.DepartmentModel.findById(req.body.departmentId).run(function(err, dept) {
        entity.firstname = req.body.firstname;
        entity.lastname = req.body.lastname;
        entity.email = req.body.email;
        entity.department = dept;
        entity.startdate = req.body.startdate;
        entity.enddate = "";
        entity.active = req.body.active;
        return entity.save(function(err) {
          return _this.save(entity, res, err);
        });
      });
    };

    UserRoutes.prototype.getall = function(req, res) {
      res.contentType('application/json');
      return this.Model.find().run(function(err, entity) {
        return res.send(entity);
      });
    };

    UserRoutes.prototype.get = function(req, res) {
      return this.Model.findById(req.params.id).populate('department').run(function(err, entity) {
        console.log("entity.department.name: " + entity.department.name);
        return res.send(entity);
      });
    };

    UserRoutes.prototype.put = function(req, res) {
      var _this = this;
      return this.Model.findById(req.params.id, function(err, entity) {
        _this.modelBind(entity, req);
        return entity.save(function(err) {
          return _this.save(entity, res, err);
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
      var _this = this;
      return this.DepartmentModel.findById(req.body.departmentId).run(function(err, dept) {
        entity.firstname = req.body.firstname;
        entity.lastname = req.body.lastname;
        entity.email = req.body.email;
        entity.department = dept;
        entity.startdate = req.body.startdate;
        entity.enddate = "";
        return entity.active = req.body.active;
      });
    };

    UserRoutes.prototype.save = function(entity, res, err) {
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

    return UserRoutes;

  })();

  exports.UserRoutes = UserRoutes;

}).call(this);
