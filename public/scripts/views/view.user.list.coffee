define (require) ->

  UserCompositeView = require '../../scripts/views/view.user.composite.js'

  class UserListView extends Backbone.Marionette.CollectionView
    itemView: UserCompositeView
    id: "user-list"  
