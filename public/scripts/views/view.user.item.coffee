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
      "click .active-status":  "toggleActivation"
      "click .btn-remove-user": "removeUser" 

    toggleActivation: (e) ->
      alert @model.get("active")

    removeUser: (e) ->
      remove = confirm("Remove #{@model.get('fullname')}")
      @model.destroy()
      # @model.get("users").remove(@model)

    edit: ->
      deptid = @model.get("departmentId")
      id = @model.get("id")
      new app.UserController().adminUsersEdit(deptid, id)
      Backbone.history.navigate("admin/department/" + @model.get("departmentId") + "/user/edit/" + @model.get("id"))

    onShow: =>
      @modelBinder.bind(@model, @el) 
      Backbone.Validation.bind(@, forceUpdate: true) 

    onClose: =>
      @modelBinder.unbind()  



