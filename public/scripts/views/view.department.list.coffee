define (require) ->

  DepartmentItemView = require '../../scripts/views/view.department.item.js'

  class departmentListView extends Backbone.Marionette.CompositeView
    itemView: DepartmentItemView
    tagName: "table"
    className: "table table-striped table-bordered"
    id: "department-list"  
    itemViewContainer: "tbody"

    initialize: =>
      @template = require '../../scripts/text!department_grid_header.html'
  
    