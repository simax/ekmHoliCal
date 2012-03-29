(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DepartmentItemView, departmentListView;
    DepartmentItemView = require('../../scripts/views/view.department.item.js');
    return departmentListView = (function(_super) {

      __extends(departmentListView, _super);

      function departmentListView() {
        departmentListView.__super__.constructor.apply(this, arguments);
      }

      departmentListView.prototype.itemView = DepartmentItemView;

      departmentListView.prototype.tagName = "table";

      departmentListView.prototype.className = "table table-striped table-bordered";

      departmentListView.prototype.id = "department-list";

      departmentListView.prototype.render = function() {
        this.$el.html("");
        this.appendHtml(this.$el, $("script#tmpl-department-grid-header").tmpl());
        this.collection.each(this.addChildView);
        this.appendHtml(this.$el, "</tbody></table>");
        if (this.onShow) this.onShow();
        return this;
      };

      return departmentListView;

    })(Backbone.Marionette.CollectionView);
  });

}).call(this);
