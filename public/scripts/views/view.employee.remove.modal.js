// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var EmployeeRemoveModalView;
    require('../../scripts/libs/bootstrap/js/bootstrap.min.js');
    return EmployeeRemoveModalView = (function(_super) {

      __extends(EmployeeRemoveModalView, _super);

      function EmployeeRemoveModalView() {
        this.onClose = __bind(this.onClose, this);

        this.onShow = __bind(this.onShow, this);

        this.removeEmployee = __bind(this.removeEmployee, this);
        return EmployeeRemoveModalView.__super__.constructor.apply(this, arguments);
      }

      EmployeeRemoveModalView.prototype.initialize = function() {
        this.modelBinder = new Backbone.ModelBinder();
        return this.template = require('../../scripts/text!employee_remove_modal.html');
      };

      EmployeeRemoveModalView.prototype.events = {
        "click #remove-confirmed": "removeEmployee"
      };

      EmployeeRemoveModalView.prototype.removeEmployee = function(e) {
        this.model.destroy();
        return $('#removeModal').modal('hide');
      };

      EmployeeRemoveModalView.prototype.onShow = function() {
        this.modelBinder.bind(this.model, this.el);
        return $('#removeModal').modal('show');
      };

      EmployeeRemoveModalView.prototype.onClose = function() {
        return this.modelBinder.unbind();
      };

      return EmployeeRemoveModalView;

    })(Backbone.Marionette.ItemView);
  });

}).call(this);
