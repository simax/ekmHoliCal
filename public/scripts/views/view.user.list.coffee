define (require) ->

  UserItemView = require '../../scripts/views/view.user.item.js'

  class UserListView extends Backbone.Marionette.CollectionView
    itemView: UserItemView
    id: "user-list"  
