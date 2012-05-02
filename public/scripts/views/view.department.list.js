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
        this.onRender = __bind(this.onRender, this);
        this.beforeRender = __bind(this.beforeRender, this);
        this.initialize = __bind(this.initialize, this);
        departmentListView.__super__.constructor.apply(this, arguments);
      }

      departmentListView.prototype.itemView = DepartmentItemView;

      departmentListView.prototype.tagName = "table";

      departmentListView.prototype.className = "table table-striped table-bordered";

      departmentListView.prototype.id = "department-list";

      departmentListView.prototype.initialize = function() {
        this.onRenderCalled = 0;
        return this.gridHeader = require('../../scripts/text!department_grid_header.html');
      };

      departmentListView.prototype.beforeRender = function() {
        if (this.before_render_fired != null) return;
        this.before_render_fired = true;
        return this.$el.prepend(this.gridHeader);
      };

      departmentListView.prototype.onRender = function() {
        this.onRenderCalled += 1;
        if (this.onRenderCalled < 2) return;
        return $("#department-list").dataTable({
          sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
          sPaginationType: "bootstrap",
          oLanguage: {
            sLengthMenu: "_MENU_ records per page"
          }
        });
      };

      return departmentListView;

    })(Backbone.Marionette.CollectionView);
  });

}).call(this);
