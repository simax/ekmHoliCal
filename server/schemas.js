(function() {
  var Schemas;

  Schemas = (function() {

    function Schemas() {
      this.mongoose = require('mongoose');
      this.schema = this.mongoose.Schema;
      this.EmployeeSchema = new this.schema({
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
        'active': {
          type: Boolean,
          "default": true
        }
      });
      this.EmployeeSchemaModel = this.mongoose.model('employees', this.EmployeeSchema);
      this.DepartmentSchema = new this.schema({
        'name': {
          type: String,
          required: true,
          index: {
            unique: true
          }
        },
        'employees': [this.EmployeeSchema]
      });
      this.DepartmentSchemaModel = this.mongoose.model('departments', this.DepartmentSchema);
      this.mongoose.connect('mongodb://localhost:8120/ekmHoliCal');
    }

    return Schemas;

  })();

  module.exports = Schemas;

}).call(this);
