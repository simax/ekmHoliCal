class UserItemView extends Backbone.View
  template: "#detail"
  tagName: "li"

  initialize: ->
    _.bindAll @, "render", "edit", "remove"
    @template = $("#user-list-item-template")

  events:
    "click .edit": "edit"
    "click .remove": "remove"

  remove: ->
    @model.toClient().destroy()

  edit: (e) ->
    console.log("xxxxxxxxxxxxxx")
    app.UserView model: @model
  

  # render: ->
  #   tmpl = Handlebars.compile(@template.html()) @model.toJSON()
  #   $(@el).html tmpl 
  #   @

class UserListView extends Backbone.View
  template: "#list"

  initialize: ->
    _.bindAll @, "render"
    @collection.bind "add", @render
    @collection.bind "remove", @render
    @collection.bind "reset", @render

  # serialize: -> 
  #   return @collection.toJSON()
        
  render: ->
    view = layout(this)
    @collection.each (model) ->
      view.insert "ul", new UserItemView(model: model)
    view.render()

    # els = []
    # @collection.each (model) ->
    #   view = new UserItemView(model: model)
    #   els.push view.render().el

    # $(@el).empty()
    # $(@el).append els
    # @

# class UserView extends Backbone.LayoutManager.View

#   initialize: ->
#     # _.bindAll @, "render"
#     # @template = $("#userTemplate")
#     console.log "UserView.model: "
#     # @model = options.model ? new app.User
#     # @render()

#   events:
#     "submit #add-edit-form": "save"

#   save: (e) ->
#     e.preventDefault()
#     # model = new app.User 

#     # @model.username = @$("#username").val()
#     # @model.address = @$("#address").val()
  
#     # @clear()
#     # if @model._id  
#     #   @model.save
#     # else    
#     #   @collection.create model


#   clear: ->
#     @$("#username").val ""
#     @$("#address").val ""

#   serialize: () -> @model.toJSON()  

#   # render: ->
#   #   tmpl = Handlebars.compile(@template.html()) @model.toJSON()
#   #   $(@el).html tmpl 
#   #   @


@app = window.app ? {}
# @app.UserItemView = UserItemView
@app.UserListView = UserListView
# @app.UserView = UserView

