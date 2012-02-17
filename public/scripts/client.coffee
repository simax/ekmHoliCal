
$ ->

  app.bind "initialize:before", (options) ->
    Backbone.Marionette.ItemView.prototype.renderTemplate = (template, data) -> template.tmpl(data) # Handlebars.compile(template)(data)

  app.addRegions
    listRegion: "#list"

  app.addInitializer () ->
    userListView = new @UserListView
      collection: @users

    @listRegion.show(userListView) 
    
  app.start()
