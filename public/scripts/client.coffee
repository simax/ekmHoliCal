Backbone.LayoutManager.configure 
  render: (template, context) ->
    Handlebars.compile(template)(context)

$ ->

  app.user = new app.User()

  main = new Backbone.LayoutManager 
    name: "#main"

  app.users.fetch().success () ->

    main.views[".list"] = new app.UserListView
      # el: $(".list")
      collection: app.users
    
    # userListView.render()
    
    main.render (content) -> 
      $(".container").html(content)
    
    return
    
  return    

  # userItemView = new app.UserItemView(
  #   el: $(".detail")
  #   model: app.user
  #   collection: app.users
  # )
