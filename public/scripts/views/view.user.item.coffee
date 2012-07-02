define (require) ->

  Utils = require '../../scripts/Utils.js' 
  window.app = new Backbone.Marionette.Application() unless window.app?

  class UserItemView extends Backbone.Marionette.ItemView
    template: "#tmpl-user-item"

    initialize: ->
      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!user_item.html'
      @model.set "users", new Backbone.Collection @model.get("users")

    events:
      "click .edit": "edit"
      "click .active-status": "toggleActivation"

    toggleActivation: (e) ->
      alert @model.get("active")

    edit: ->
      new app.UserController().adminUsersEdit(@model.get("_id"))
      Backbone.history.navigate("admin/users/edit/" + @model.get("_id"))

    onShow: =>
      @modelBinder.bind(@model, @el) 
      Backbone.Validation.bind(@, forceUpdate: true) 

    onClose: =>
      @modelBinder.unbind()  



