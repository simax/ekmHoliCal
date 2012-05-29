define (require) ->

  UserItemView = require '../../scripts/views/view.user.item.js'

  class UserListView extends Backbone.Marionette.CompositeView
    itemView: UserItemView
    tagName: "table"
    className: "table table-striped table-bordered"
    id: "user-list"  

    initialize: =>
      @template = require '../../scripts/text!user_grid_header.html'

    appendHtml: (collectionView, itemView ) =>
      collectionView.$("tbody").append(itemView.el)
