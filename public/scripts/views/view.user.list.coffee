define (require) ->

  UserItemView = require '../../scripts/views/view.user.item.js'

  class UserListView extends Backbone.Marionette.CompositeView
    itemView: UserItemView
    tagName: "table"
    className: "table table-striped table-bordered"
    id: "user-list"  

    initialize: =>
      @onRenderCalled = 0
      @template = require '../../scripts/text!user_grid_header.html'

    appendHtml: (collectionView, itemView ) =>
      collectionView.$("tbody").append(itemView.el)    

    # onRender: =>  
    #   @onRenderCalled += 1  
    #   return if @onRenderCalled < 2 

    # $("#user-list").dataTable
    #   sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
    #   sPaginationType: "bootstrap"
    #   oLanguage:
    #     sLengthMenu: "_MENU_ records per page"      
