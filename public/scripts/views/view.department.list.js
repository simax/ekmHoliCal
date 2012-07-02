(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentItemView, departmentListView;
    DepartmentItemView = require('../../scripts/views/view.department.item.js');
    return departmentListView = (function(_super) {

      __extends(departmentListView, _super);

      function departmentListView() {
        this.initialize = __bind(this.initialize, this);
        departmentListView.__super__.constructor.apply(this, arguments);
      }

      departmentListView.prototype.itemView = DepartmentItemView;

      departmentListView.prototype.tagName = "table";

      departmentListView.prototype.className = "table table-striped table-bordered";

      departmentListView.prototype.id = "department-list";

      departmentListView.prototype.itemViewContainer = "tbody";

      departmentListView.prototype.initialize = function() {
        return this.template = require('../../scripts/text!department_grid_header.html');
      };

      return departmentListView;

    })(Backbone.Marionette.CompositeView);
  });

}).call(this);
