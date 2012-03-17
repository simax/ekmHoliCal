define (require) ->

  UserItemView = require '../../scripts/views/view.user.item.js'

  class UserListView extends Backbone.Marionette.CollectionView
    itemView: UserItemView
    tagName: "table"
    className: "table table-striped table-bordered"
    id: "user-list"  

    render: ->
      @$el.html ""  
      @appendHtml @$el, $("script#tmpl-user-grid-header").tmpl() 
      @collection.each(@addChildView)
      @appendHtml @$el, "</tbody></table>"  

      if(@onRender) 
        @onRender()
      @
    
    # onShow: ->
    #   $("#user-list").dataTable
    #     sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
    #     sPaginationType: "bootstrap"
    #     oLanguage:
    #       sLengthMenu: "_MENU_ records per page"      


  UserListView
