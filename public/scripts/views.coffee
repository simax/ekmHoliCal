class UserItemView extends Backbone.View
  tagName: "li"
  initialize: ->
    _.bindAll @, "render", "show", "remove"
    @template = $("#user-list-item-template")

  events:
    "click .edit": "show"
    "click .remove": "remove"

  remove: ->
    @model.destroy()

  show: (e) ->
    alert @model.get("username")

  render: ->
    @template.tmpl(@model.toJSON()).appendTo @el
    @


class UserListView extends Backbone.View
  tagName: "ul"
  initialize: ->
    _.bindAll @, "render"
    @collection.bind "add", @render
    @collection.bind "remove", @render
    @collection.bind "reset", @render
    @render()

  render: ->
    els = []
    @collection.each (model) ->
      view = new UserItemView(model: model)
      els.push view.render().el

    $(@el).empty()
    $(@el).append els
    @

class UserView extends Backbone.View
  initialize: ->
    _.bindAll @, "render"
    @template = $("#userTemplate")
    @render()

  events:
    "submit #add-edit-form": "save"

  save: (e) ->
    e.preventDefault()
    model = new User(
      username: @$("#username").val()
      address1: @$("#address1").val()
    )
    @clear()
    @collection.add model

  clear: ->
    @$("#username").val ""
    @$("#address1").val ""

  render: ->
    @template.tmpl(@model.toJSON()).appendTo @el
    @

@app = window.app ? {}
@app.UserItemView = UserItemView
@app.UserListView = UserListView
@app.UserView = UserView



