define (require) ->

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

    edit: (e) ->
      id = @model.id
      app.vent.trigger "admin:users:edit", id  
    
    # renderHtml: (data) =>
    #   viewModel = kb.viewModel(@model)
    #   ko.applyBindings(viewModel, @el)