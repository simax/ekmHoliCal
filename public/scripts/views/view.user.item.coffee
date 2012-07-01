define (require) ->

  Utils = require '../../scripts/Utils.js' 
  window.app = new Backbone.Marionette.Application() unless window.app?

  class UserItemView extends Backbone.Marionette.ItemView
    template: "#tmpl-user-item"

    initialize: ->
      @template = require '../../scripts/text!user_item.html'
      @model.set "users", new Backbone.Collection @model.get("users")
      @buildViewModel()

    buildViewModel: =>
      @viewModel=kb.viewModel(@model)
      @viewModel.fullname = kb.formattedObservable("{0} {1}", @viewModel.firstname, @viewModel.lastname )
      @viewModel.gravatar = kb.formattedObservable("{0}{1}", "http://www.gravatar.com/avatar/", Utils.CreateMD5Hash(@model.get("email")))

    events:
      "click .edit": "edit"
      "click .active-status": "toggleActivation"

    toggleActivation: (e) ->
      alert @model.get("active")

    edit: ->
      new app.UserController().adminUsersEdit(@model.id)
      Backbone.history.navigate("admin/users/edit/" + @model.id)

    render: =>
      super
      ko.applyBindings(@viewModel, @el)


