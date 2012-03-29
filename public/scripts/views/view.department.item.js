(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentItemView;
    return DepartmentItemView = (function(_super) {

      __extends(DepartmentItemView, _super);

      function DepartmentItemView() {
        DepartmentItemView.__super__.constructor.apply(this, arguments);
      }

      DepartmentItemView.prototype.template = "#tmpl-department-item";

      DepartmentItemView.prototype.tagName = "tr";

      DepartmentItemView.prototype.initialize = function() {
        return this.template = require('../../scripts/text!department_item.html');
      };

      DepartmentItemView.prototype.events = {
        "click .edit": "edit",
        "click .active-status": "toggleActivation"
      };

      DepartmentItemView.prototype.toggleActivation = function(e) {
        return alert(JSON.stringify(this.model.get("active")));
      };

      DepartmentItemView.prototype.edit = function(e) {
        var id;
        id = this.model.id;
        return app.vent.trigger("admin:departments:edit", id);
      };

      return DepartmentItemView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
