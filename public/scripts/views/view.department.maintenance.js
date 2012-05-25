(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentMaintenanceView, Utils;
    require('jqueryUI');
    require('jqueryQtip');
    Utils = require('../../scripts/Utils.js');
    return DepartmentMaintenanceView = (function(_super) {

      __extends(DepartmentMaintenanceView, _super);

      function DepartmentMaintenanceView() {
        this.onClose = __bind(this.onClose, this);
        this.onShow = __bind(this.onShow, this);
        this.initialize = __bind(this.initialize, this);
        DepartmentMaintenanceView.__super__.constructor.apply(this, arguments);
      }

      DepartmentMaintenanceView.prototype.className = "row";

      DepartmentMaintenanceView.prototype.initialize = function() {
        this.viewModel = this.options.viewModel;
        return this.template = require('../../scripts/text!department_maintenance.html');
      };

      DepartmentMaintenanceView.prototype.events = {
        "click #cancel-button": "cancel",
        "submit #department-create": "save"
      };

      DepartmentMaintenanceView.prototype.save = function(e) {
        var modelValid;
        e.preventDefault();
        modelValid = this.model.isValid(true);
        console.log("Is model valid:" + modelValid);
        if (modelValid) {
          this.model.save(this.model.attributes, {
            error: function(model, res) {
              return alert(res.responseText);
            }
          });
          return app.vent.trigger("main:admin:departments");
        }
      };

      DepartmentMaintenanceView.prototype.cancel = function(e) {
        e.preventDefault();
        return app.vent.trigger("main:admin:departments");
      };

      DepartmentMaintenanceView.prototype.onShow = function() {
        ko.applyBindings(this.viewModel, this.el);
        console.log("model name: " + this.viewModel.name());
        return Backbone.Validation.bind(this, {
          forceUpdate: true
        });
      };

      DepartmentMaintenanceView.prototype.onClose = function() {};

      return DepartmentMaintenanceView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
