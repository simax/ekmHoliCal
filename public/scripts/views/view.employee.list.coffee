define (require) ->

  EmployeeCompositeView = require '../../scripts/views/view.employee.composite.js'
  EmployeeListEmptyView = require '../../scripts/views/view.employee.list.empty.js'

  class EmployeeListView extends Backbone.Marionette.CollectionView
    itemView: EmployeeCompositeView
    id: "employee-list"  
    emptyView: EmployeeListEmptyView
  