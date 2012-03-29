(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentMaintenanceView, Utils;
    Backbone.ModelBinding = require('modelbinding');
    require('jqueryUI');
    require('jqueryQtip');
    Utils = require('../../scripts/Utils.js');
    return DepartmentMaintenanceView = (function(_super) {

      __extends(DepartmentMaintenanceView, _super);

      function DepartmentMaintenanceView() {
        DepartmentMaintenanceView.__super__.constructor.apply(this, arguments);
      }

      DepartmentMaintenanceView.prototype.className = "row";

      DepartmentMaintenanceView.prototype.initialize = function() {
        return this.template = require('../../scripts/text!department_maintenance.html');
      };

      DepartmentMaintenanceView.prototype.events = {
        "click #cancel-button": "cancel",
        "submit #department-create": "save"
      };

      DepartmentMaintenanceView.prototype.save = function(e) {
        var modelValid, res;
        e.preventDefault();
        modelValid = this.model.isValid(true);
        console.log("Is model valid:" + modelValid);
        if (modelValid) {
          if (this.model.isNew()) {
            res = this.collection.create(this.model, {
              wait: true
            });
          } else {
            this.model.save(this.model.attributes, {
              error: function() {
                return alert("Error saving !!!");
              }
            });
          }
          return app.vent.trigger("main:admin:departments");
        }
      };

      DepartmentMaintenanceView.prototype.cancel = function(e) {
        e.preventDefault();
        return app.vent.trigger("main:admin:departments");
      };

      DepartmentMaintenanceView.prototype.onShow = function() {
        Backbone.ModelBinding.bind(this);
        return Backbone.Validation.bind(this, {
          forceUpdate: true
        });
      };

      return DepartmentMaintenanceView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
