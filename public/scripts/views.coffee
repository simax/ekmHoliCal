@app = window.app ? new Backbone.Marionette.Application()

class UserItemView extends Backbone.Marionette.ItemView
  template: "#item"
  tagName: "li"

  events:
    "click .edit": "edit"
    "click .remove": "delete"

  delete: (e) ->
    @model.destroy()

  edit: (e) ->
    alert JSON.stringify @model
  
@app.UserItemView = UserItemView


class UserListView extends Backbone.Marionette.CollectionView
  tagName: "ul",
  itemView: app.UserItemView

@app.UserListView = UserListView


class UserEditView extends Backbone.Marionette.ItemView
  template: "#user-maintenance"

  events:
    "submit #add-edit-form": "save"

  save: (e) ->
    e.preventDefault()
    model = new app.User 

    @model.username = @$("#username").val()
    @model.address = @$("#address").val()
  
    @clear()
    if @model.id  
      @model.save
    else    
      @collection.create model

  clear: ->
    @$("#username").val ""
    @$("#address").val ""


@app.UserEditView = UserEditView

