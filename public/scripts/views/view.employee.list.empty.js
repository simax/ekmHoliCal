// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var EmployeeListEmptyView, Utils;
    Utils = require('../../scripts/Utils.js');
    if (window.app == null) {
      window.app = new Backbone.Marionette.Application();
    }
    return EmployeeListEmptyView = (function(_super) {

      __extends(EmployeeListEmptyView, _super);

      function EmployeeListEmptyView() {
        return EmployeeListEmptyView.__super__.constructor.apply(this, arguments);
      }

      EmployeeListEmptyView.prototype.initialize = function() {
        return this.template = require('../../scripts/text!employee_list_empty.html');
      };

      return EmployeeListEmptyView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
