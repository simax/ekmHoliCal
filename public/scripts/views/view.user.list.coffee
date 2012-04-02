define (require) ->

  UserItemView = require '../../scripts/views/view.user.item.js'

  class UserListView extends Backbone.Marionette.CollectionView
    itemView: UserItemView
    tagName: "table"
    className: "table table-striped table-bordered"
    id: "user-list"  

    render: ->
      @$el.html ""  
      template = Handlebars.compile($('script#tmpl-user-grid-header').html())

      # @appendHtml @$el, Handlebars.compile($('script#tmpl-user-grid-header').html())() 
      @collection.each(@addChildView)
      # @appendHtml @$el, "</tbody></table>"  

      if(@onShow) 
        @onShow()
      @
    
    # onShow: ->
    #   $("#user-list").dataTable
    #     sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
    #     sPaginationType: "bootstrap"
    #     oLanguage:
    #       sLengthMenu: "_MENU_ records per page"      

