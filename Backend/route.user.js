(function() {
  var UserRoutes,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  UserRoutes = (function() {

    function UserRoutes() {
      this.modelBind = __bind(this.modelBind, this);
      this["delete"] = __bind(this["delete"], this);
      this.get = __bind(this.get, this);
      this.getall = __bind(this.getall, this);
      this.post = __bind(this.post, this);
      this.put = __bind(this.put, this);      this.Schemas = require('./schemas');
      this.DepartmentModel = new this.Schemas.DepartmentSchemaBuilder().Model;
      this.Model = new this.Schemas.UserSchemaBuilder().Model;
    }

    UserRoutes.prototype.put = function(req, res) {
      var _this = this;
      return this.Model.findById(req.params.id, function(err, entity) {
        _this.modelBind(entity, req);
        return entity.save(function(err) {
          return _this.save(entity, res, err);
        });
      });
    };

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
      res.contentType('application/json');
      return this.Model.find().run(function(err, entity) {
        return res.send(entity);
      });
    };

    UserRoutes.prototype.get = function(req, res) {
      return this.Model.findById(req.params.id).populate('department').run(function(err, entity) {
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
      var _this = this;
      entity.firstname = req.body.firstname;
      entity.lastname = req.body.lastname;
      entity.email = req.body.email;
      entity.EndDate = req.body.EndDate;
      entity.EndDate = "";
      entity.active = req.body.active;
      entity.department = req.body.department;
      return this.DepartmentModel.findById(req.body.department.id).run(function(err, dept) {
        return entity.department = dept;
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
