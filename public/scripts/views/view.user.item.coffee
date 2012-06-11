define (require) ->

  window.app = new Backbone.Marionette.Application() unless window.app?

  class UserItemView extends Backbone.Marionette.ItemView
    template: "#tmpl-user-item"
    tagName: "tr"

    initialize: ->
      @template = require '../../scripts/text!user_item.html'

    events:
      "click .edit": "edit"
      "click .active-status": "toggleActivation"

    toggleActivation: (e) ->
      alert @model.get("active")

    edit: ->
      new app.UserController().adminUsersEdit(@model.id)
      Backbone.history.navigate("admin/users/edit/" + @model.id)
