(function() {
  var ObjectId, Schema, UserModel, UserSchema, app, con, express, mongoose;

  express = require('express');

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  ObjectId = Schema.ObjectId;

  UserSchema = new Schema({
    '_id': ObjectId,
    'username': String
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
    return user.save(function(err) {
      if (err) return res.send(err);
    });
  });

  app.get('/ekmHoliCal/Users', function(req, res) {
    res.contentType('application/json');
    return UserModel.find(function(err, users) {
      return res.send(users);
    });
  });

  app.get('/ekmHoliCal/create', function(req, res) {
    return res.render('create');
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
