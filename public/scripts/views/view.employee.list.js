// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var EmployeeCompositeView, EmployeeListEmptyView, EmployeeListView;
    EmployeeCompositeView = require('../../scripts/views/view.employee.composite.js');
    EmployeeListEmptyView = require('../../scripts/views/view.employee.list.empty.js');
    return EmployeeListView = (function(_super) {

      __extends(EmployeeListView, _super);

      function EmployeeListView() {
        return EmployeeListView.__super__.constructor.apply(this, arguments);
      }

      EmployeeListView.prototype.itemView = EmployeeCompositeView;

      EmployeeListView.prototype.id = "employee-list";

      EmployeeListView.prototype.emptyView = EmployeeListEmptyView;

      return EmployeeListView;

    })(Backbone.Marionette.CollectionView);
  });

}).call(this);
