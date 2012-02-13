(function() {
  var ObjectId, Schema, UserModel, UserSchema, app, con, express, mongoose, root;

  express = require('express');

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  ObjectId = Schema.ObjectId;

  UserSchema = new Schema({
    'username': String,
    'address': String
  });

  UserModel = mongoose.model('Users', UserSchema);

  con = mongoose.connect('mongodb://localhost:8124/ekmHoliCal');

  app = express.createServer().listen(process.env.PORT);

  root = '/ekmHoliCal';

  app.configure(function() {
    app.register('html', {
      compile: function(str, options) {
        return function(locals) {
          return str;
        };
      }
    });
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('view options', {
      layout: false
    });
    app.use(express.bodyParser());
    app.use(app.router);
    return app.use(express.static(__dirname + '/public'));
  });

  app.get(root + '/index', function(req, res, next) {
    return res.render('index');
  });

  app.get(root, function(req, res) {
    return UserModel.find(function(err, docs) {
      return res.render('index', {
        locals: {
          users: docs
        }
      });
    });
  });

  app.post(root + '/Users', function(req, res) {
    var addr, user, userName;
    userName = req.param('username');
    addr = req.param('address');
    user = new UserModel({
      username: userName,
      address: addr
    });
    user.save(function(err) {
      if (err) return res.send(err);
    });
    return res.send(user);
  });

  app.get(root + '/Users', function(req, res) {
    res.contentType('application/json');
    return UserModel.find(function(err, users) {
      return res.send(users);
    });
  });

  app.put(root + '/Users/:id', function(req, res) {
    console.log("put @ /ekmHoliCal/Users/:id");
    return UserModel.findById(req.params.id, function(err, doc) {
      doc.update();
      return res.send(200);
    });
  });

  app["delete"](root + '/Users/:id', function(req, res) {
    return UserModel.findById(req.params.id, function(err, doc) {
      doc.remove();
      return res.send(204);
    });
  });

  app.get(root + '/user/:id', function(req, res) {
    return UserModel.findById(req.params.id, function(err, doc) {
      return res.render('edit', {
        locals: {
          user: doc
        }
      });
    });
  });

  app.get(root + '/find/:userName', function(req, res) {
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
