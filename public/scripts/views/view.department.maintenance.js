(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentMaintenanceView;
    return DepartmentMaintenanceView = (function(_super) {

      __extends(DepartmentMaintenanceView, _super);

      function DepartmentMaintenanceView() {
        DepartmentMaintenanceView.__super__.constructor.apply(this, arguments);
      }

      DepartmentMaintenanceView.prototype.template = "#tmpl-department-maintenance";

      DepartmentMaintenanceView.prototype.className = "row";

      DepartmentMaintenanceView.prototype.onShow = function() {
        Backbone.ModelBinding.bind(this);
        return Backbone.Validation.bind(this, {
          forceUpdate: true
        });
      };

      DepartmentMaintenanceView.prototype.events = {
        "click #cancel-button": "cancel",
        "submit #user-create": "save"
      };

      DepartmentMaintenanceView.prototype.save = function(e) {
        var modelValid;
        e.preventDefault();
        modelValid = this.model.isValid(true);
        console.log("Is model valid:" + modelValid);
        if (modelValid) {
          this.model.save();
          return app.vent.trigger("main:admin");
        }
      };

      DepartmentMaintenanceView.prototype.cancel = function(e) {
        e.preventDefault();
        return app.vent.trigger("main:admin");
      };

      return DepartmentMaintenanceView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
