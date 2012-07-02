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
      @enhanceModel()

    enhanceModel: =>
      _.each @collection.models, (user) => 
        user.set "fullname", "#{user.get('firstname')} #{user.get('lastname')}"
        user.set "gravatar", "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(user.get('email'))
      return
