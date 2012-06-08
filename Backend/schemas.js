(function() {
  var DepartmentSchemaBuilder, UserSchemaBuilder;

  DepartmentSchemaBuilder = (function() {

    function DepartmentSchemaBuilder() {
      var con;
      this.mongoose = require('mongoose');
      this.schema = this.mongoose.Schema;
      this.DepartmentSchema = new this.schema({
        'name': {
          type: String,
          required: true,
          index: {
            unique: true
          }
        }
      });
      this.Model = this.mongoose.model('departments', this.DepartmentSchema);
      con = this.mongoose.connect('mongodb://localhost:8120/ekmHoliCal');
    }

    return DepartmentSchemaBuilder;

  })();

  UserSchemaBuilder = (function() {

    function UserSchemaBuilder() {
      var con;
      this.mongoose = require('mongoose');
      this.schema = this.mongoose.Schema;
      this.ObjectId = this.schema.ObjectId;
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
        'departmentId': {
          type: {
            String: {
              required: true
            }
          }
        },
        'enddate': String,
        'enddate': String,
        'active': {
          type: Boolean,
          "default": true
        }
      });
      this.Model = this.mongoose.model('users', this.UserSchema);
      con = this.mongoose.connect('mongodb://localhost:8120/ekmHoliCal');
    }

    return UserSchemaBuilder;

  })();

  exports.DepartmentSchemaBuilder = DepartmentSchemaBuilder;

  exports.UserSchemaBuilder = UserSchemaBuilder;

}).call(this);
