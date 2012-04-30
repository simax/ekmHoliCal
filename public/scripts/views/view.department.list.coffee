define (require) ->

  DepartmentItemView = require '../../scripts/views/view.department.item.js'

  class departmentListView extends Backbone.Marionette.CollectionView
    itemView: DepartmentItemView
    tagName: "table"
    className: "table table-striped table-bordered"
    id: "department-list"  

    # render: ->
    #   @$el.html ""  
    #   @appendHtml @$el, Handlebars.compile($(require('../../scripts/text!department_grid_header.html')).html())
    #   @collection.each(@addChildView)
    #   @appendHtml @$el, "</tbody></table>"  

    #   if(@onShow) 
    #     @onShow()
    #   @
    
    # onShow: ->
    #   $("#department-list").dataTable
    #     sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
    #     sPaginationType: "bootstrap"
    #     oLanguage:
    #       sLengthMenu: "_MENU_ records per page"      

