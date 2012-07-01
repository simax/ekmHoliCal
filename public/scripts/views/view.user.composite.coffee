define (require) ->

  Utils = require '../../scripts/Utils.js' 
  UserItemView = require '../../scripts/views/view.user.item.js'
  window.app = new Backbone.Marionette.Application() unless window.app?

  class UserCompositeView extends Backbone.Marionette.CompositeView
    itemView: UserItemView
    itemViewContainer: '#users'

    initialize: =>
      @template = require '../../scripts/text!user_department_header.html'
      @collection = new Backbone.Collection @model.get("users") 
      @buildViewModel()

    buildViewModel: =>
      @viewModel=kb.viewModel(@model)
      # Need to loop over users and create the following properties
      @viewModel.fullname = kb.formattedObservable("{0} {1}", @viewModel.firstname, @viewModel.lastname )
      @viewModel.gravatar = kb.formattedObservable("{0}{1}", "http://www.gravatar.com/avatar/", Utils.CreateMD5Hash(@model.get("email")))
  
    render: =>
      super
      ko.applyBindings(@viewModel, @el)

    # appendHtml: (collectionView, itemView) =>
    #   collectionView.append(itemView.el)

