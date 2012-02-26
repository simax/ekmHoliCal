(function() {
  var ObjectId, Schema, UserModel, UserSchema, backend, con, express, mongoose, root;

  express = require('express');

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  ObjectId = Schema.ObjectId;

  UserSchema = new Schema({
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
      validate: /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\b/
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

  UserModel = mongoose.model('Users', UserSchema);

  con = mongoose.connect('mongodb://localhost:8124/ekmHoliCal');

  backend = express.createServer().listen(process.env.PORT);

  root = '/ekmHoliCal';

  backend.configure(function() {
    backend.register('html', {
      compile: function(str, options) {
        return function(locals) {
          return str;
        };
      }
    });
    backend.set('views', __dirname + '/views');
    backend.set('view engine', 'html');
    backend.set('view options', {
      layout: false
    });
    backend.use(express.bodyParser());
    backend.use(backend.router);
    return backend.use(express.static(__dirname + '/public'));
  });

  backend.get(root + '/index', function(req, res, next) {
    return res.render('index');
  });

  backend.post(root + '/users', function(req, res) {
    var user;
    console.log("body: " + req.body.firstname);
    console.log("lastname: " + req.param('lastname'));
    console.log("email: " + req.param('email'));
    console.log("entitlement: " + req.param('entitlement'));
    console.log("startdate: " + req.param('startdate'));
    console.log("active: " + req.param('active'));
    user = new UserModel;
    user.firstname = req.param('firstname');
    user.lastname = req.param('lastname');
    user.email = req.param('email');
    user.entitlement = 25;
    user.startdate = "startdate";
    user.enddate = "enddate";
    user.active = true;
    user.save(function(err) {
      if (err) console.log(err);
      if (err) return res.send(err);
    });
    return res.send(user);
  });

  backend.get(root + '/users', function(req, res) {
    res.contentType('application/json');
    return UserModel.find(function(err, users) {
      return res.send(users);
    });
  });

  backend.put(root + '/users/:id', function(req, res) {
    return UserModel.findById(req.params.id, function(err, doc) {
      doc.update();
      return res.send(200);
    });
  });

  backend["delete"](root + '/users/:id', function(req, res) {
    return UserModel.findById(req.params.id, function(err, doc) {
      doc.remove();
      return res.send(204);
    });
  });

  backend.get(root + '/user/:id', function(req, res) {
    return UserModel.findById(req.params.id, function(err, doc) {
      return res.render('edit', {
        locals: {
          user: doc
        }
      });
    });
  });

  backend.get(root + '/find/:userName', function(req, res) {
    return UserModel.findOne({
      'username': req.params.userName
    }, function(err, doc) {
      if (doc) {
        return res.send("User " + doc.username + " found");
      } else {
        return res.send(req.params.userName + " not found");
      }
    });
  });

}).call(this);
