define (require) ->

  UserItemView = require '../../scripts/views/view.user.item.js'
  window.app = new Backbone.Marionette.Application() unless window.app?

  class UserCompositeView extends Backbone.Marionette.CompositeView
    # template: "#tmpl-user-department-header" 
    itemView: UserItemView

    initialize: ->
      @template = require '../../scripts/text!user_department_header.html'
      @buildViewModel()
 
    buildViewModel: =>
      @viewModel=kb.viewModel(@model)

    # renderModel: =>
    #   super
    #   ko.applyBindings(@viewModel, @el)

    # appendHtml: (collectionView, itemView) =>
    #   collectionView.append(itemView.el)

