(function() {
  var ObjectId, Schema, UserModel, UserSchema, app, con, express, mongoose;

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

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
      layout: true
    });
    app.use(express.bodyParser());
    app.use(app.router);
    return app.use(express.static(__dirname + '/public'));
  });

  app.get('/ekmHoliCal/index', function(req, res, next) {
    return res.render('index');
  });

  app.get('/ekmHoliCal', function(req, res) {
    return UserModel.find(function(err, docs) {
      return res.render('index', {
        locals: {
          users: docs
        }
      });
    });
  });

  app.post('/ekmHoliCal/Users', function(req, res) {
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

  app.get('/ekmHoliCal/Users', function(req, res) {
    console.log("called get on : /ekmHoliCal/Users");
    res.contentType('application/json');
    return UserModel.find(function(err, users) {
      return res.send(users);
    });
  });

  app["delete"]('/ekmHoliCal/Users/:id', function(req, res) {
    console.log("called delete on : /ekmHoliCal/Users/:id");
    return UserModel.findById(req.params.id, function(err, doc) {
      doc.remove();
      return res.send(204);
    });
  });

  app.get('/ekmHoliCal/user/:id', function(req, res) {
    return UserModel.findById(req.params.id, function(err, doc) {
      return res.render('edit', {
        locals: {
          user: doc
        }
      });
    });
  });

  app.get('/ekmHoliCal/find/:userName', function(req, res) {
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
