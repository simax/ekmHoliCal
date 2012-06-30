define (require) ->

  UserCompositeView = require '../../scripts/views/view.user.composite.js'

  class UserListView extends Backbone.Marionette.CollectionView
    itemView: UserCompositeView
    id: "user-list"  

    appendHtml: (collectionView, itemView, index) =>
      itemModel = @collection.at(index)
      itemView = new UserCompositeView
        model: itemModel 
        collection: new Backbone.Collection itemModel.get("users")
            
      collectionView.$el.append itemView.el
  