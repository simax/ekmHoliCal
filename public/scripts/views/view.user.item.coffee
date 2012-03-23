define (require) ->

  # require 'text!../../templates/tmpl.user.item.html'

  class UserItemView extends Backbone.Marionette.ItemView
    template: "#tmpl-user-item"
    tagName: "tr"

    events:
      "click .edit": "edit"
      "click .active-status": "toggleActivation"

    toggleActivation: (e) ->
      alert JSON.stringify @model.get("active")

    edit: (e) ->
      id = @model.id
      app.vent.trigger "admin:users:edit", id  
    
  return UserItemView