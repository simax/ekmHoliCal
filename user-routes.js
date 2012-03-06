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
      this.post = __bind(this.post, this);
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
        'entitlement': {
          type: Number,
          min: 0,
          max: 365
        },
        'startdate': String,
        'enddate': String,
        'active': {
          type: Boolean,
          "default": true
        }
      });
      this.UserModel = this.mongoose.model('Users', this.UserSchema);
      con = this.mongoose.connect('mongodb://localhost:8124/ekmHoliCal');
    }

    UserRoutes.prototype.post = function(req, res) {
      var user;
      user = new this.UserModel;
      this.modelBind(user, req);
      user.save(function(err) {
        if (err) console.log(err);
        if (err) return res.send(err);
      });
      return res.send(user);
    };

    UserRoutes.prototype.getall = function(req, res) {
      res.contentType('application/json');
      return this.UserModel.find(function(err, users) {
        return res.send(users);
      });
    };

    UserRoutes.prototype.get = function(req, res) {
      console.log("req.params.id: " + req.params.id + "req.body.id: " + req.body.id);
      return this.UserModel.findById(req.params.id, function(err, doc) {
        return res.send(doc);
      });
    };

    UserRoutes.prototype.put = function(req, res) {
      console.log("req.params.id: " + req.params.id);
      return this.UserModel.findById(req.params.id, function(err, doc) {
        if (err) console.log(err);
        if (err) res.send(err);
        return console.log("firstname: " + req.body.firstname);
      });
    };

    UserRoutes.prototype["delete"] = function(req, res) {
      return this.UserModel.findById(req.params.id, function(err, doc) {
        doc.remove();
        return res.send(204);
      });
    };

    UserRoutes.prototype.modelBind = function(doc, req) {
      console.log("req.body.firstname: " + req.body.firstname);
      doc.firstname = req.body.firstname;
      doc.lastname = req.body.lastname;
      doc.email = req.body.email;
      doc.entitlement = req.body.entitlement;
      doc.startdate = req.body.startdate;
      doc.enddate = "";
      return doc.active = req.body.active;
    };

    return UserRoutes;

  })();

  module.exports = new UserRoutes();

}).call(this);
