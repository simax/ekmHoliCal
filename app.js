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
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
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

app.post('/ekmHoliCal/addnewuser', function(req, res) {
  var user, userName;
  userName = req.param('username');
  user = new UserModel({
    username: userName
  });
  return user.save(function(err) {
    if (!err) return res.redirect('/ekmHoliCal');
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
