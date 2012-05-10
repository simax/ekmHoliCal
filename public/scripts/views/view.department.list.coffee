define (require) ->

  DepartmentItemView = require '../../scripts/views/view.department.item.js'

  class departmentListView extends Backbone.Marionette.CompositeView
    itemView: DepartmentItemView
    tagName: "table"
    className: "table table-striped table-bordered"
    id: "department-list"  

    initialize: =>
      @onRenderCalled = 0
      @template = require '../../scripts/text!department_grid_header.html'

    appendHtml: (collectionView, itemView ) =>
      collectionView.$("tbody").append(itemView.el)     
    
    # onRender: =>
    #   @onRenderCalled += 1  
    #   return if @onRenderCalled < 2  

    #   $("#department-list").dataTable
    #     sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
    #     sPaginationType: "bootstrap"
    #     oLanguage:
    #       sLengthMenu: "_MENU_ records per page"      
