$ ->
  # start = ->
    # users = new Users()
    # users.add new User(
    #   username: "User1"
    #   address1: "Somewhere1"
    # ) 
    # users.add new User(
    #   username: "User2"
    #   address1: "Somewhere2"
    # )
    # users.add new User(
    #   username: "User3"
    #   address1: "Somewhere3"
    # )
    # users.add new User(
    #   username: "User4"
    #   address1: "Somewhere4"
    # )
    # users.add new User(
    #   username: "User5"
    #   address1: "Somewhere5"
    # )
    # users.add new User(
    #   username: "User6"
    #   address1: "Somewhere6"
    # )
    # users.add new User(
    #   username: "User7"
    #   address1: "Somewhere7"
    # )
    # users.add new User(
    #   username: "User8"
    #   address1: "Somewhere8"
    # )
    # users.add new User(
    #   username: "User9"
    #   address1: "Somewhere9"
    # )
    # users.add new User(
    #   username: "User10"
    #   address1: "Somewhere10"
    # )


  User = Backbone.Model.extend({})
  Users = Backbone.Collection.extend(model: User, url: "/ekmHolical/Users")

  UserItemView = Backbone.View.extend(
    tagName: "li"
    initialize: ->
      _.bindAll this, "render", "show", "remove"
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
      this
  )
  
  UserListView = Backbone.View.extend(
    tagName: "ul"
    initialize: ->
      _.bindAll this, "render"
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
      this
  )
  
  UserView = Backbone.View.extend(
    initialize: ->
      _.bindAll this, "render"
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
      this
  )

  user = new User()
  users = new Users()

  users.fetch(
    # success: -> 
    #   alert("Success")

    # error: -> console.log(arguments)
  )

  userListView = new UserListView(
    el: $("#list-item")
    collection: users
  )

  userView = new UserView(
    el: $("#item")
    model: user
    collection: users
  )

  return



