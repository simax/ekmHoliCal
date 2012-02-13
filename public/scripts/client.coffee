Backbone.LayoutManager.configure 
  render: (template, context) ->
    Handlebars.compile(template)(context)

$ ->

  app.user = new app.User()

  app.users.fetch().success () ->
    main = new Backbone.LayoutManager 
      name: "#main"

    userListView = new app.UserListView
      el: $(".list")
      collection: app.users
    
    main.render (contents) -> 
      $(".container").html(contents)
  
  return    

  # userItemView = new app.UserItemView(
  #   el: $(".detail")
  #   model: app.user
  #   collection: app.users
  # )
