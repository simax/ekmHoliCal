define (require) ->

  UserCompositeView = require '../../scripts/views/view.user.composite.js'
  UserListEmptyView = require '../../scripts/views/view.user.list.empty.js'

  class UserListView extends Backbone.Marionette.CollectionView
    itemView: UserCompositeView
    id: "user-list"  
    emptyView: UserListEmptyView
 