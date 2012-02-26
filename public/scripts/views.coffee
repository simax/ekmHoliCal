@app = window.app ? new Backbone.Marionette.Application()

# Main view

class MainView extends Backbone.Marionette.ItemView
  template: "#tmpl-main-region"

@app.MainView = MainView  


# User Views

class UserItemView extends Backbone.Marionette.ItemView
  template: "#tmpl-user-item"
  tagName: "tr"

  events:
    "click .edit": "edit"
    "click .active": "toggleActivation"

  toggleActivation: (e) ->
    alert JSON.stringify @model.get("active")

  edit: (e) ->
    alert JSON.stringify @model
  
@app.UserItemView = UserItemView


class UserListView extends Backbone.Marionette.CollectionView
  itemView: app.UserItemView
  tagName: "table"
  className: "table table-striped table-bordered"
  id: "user-list"  

  render: ->

    @appendHtml @$el, $("script#tmpl-user-grid-header").tmpl() 
    @collection.each(@addChildView)
    @appendHtml @$el, "</tbody></table>"  

    if(@onRender) 
      @onRender()
    @
  
  onShow: ->
    $("#user-list").dataTable
      sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
      sPaginationType: "bootstrap"
      oLanguage:
        sLengthMenu: "_MENU_ records per page"

@app.UserListView = UserListView


# class UserEditView extends Backbone.Marionette.ItemView
#   template: "#tmpl-user-maintenance"

#   events:
#     "submit #add-edit-form": "save"

#   save: (e) ->
#     e.preventDefault()
#     model = new app.User 

#     @model.username = @$("#username").val()
#     @model.address = @$("#address").val()
  
#     @clear()
#     if @model.id  
#       @model.save
#     else    
#       @collection.create model

#   clear: ->
#     @$("#username").val ""
#     @$("#address").val ""

# @app.UserEditView = UserEditView


class UserCreateView extends Backbone.Marionette.ItemView
  template: "#tmpl-user-maintenance"
  className: "row"
  
  events:
    "click #cancel-button": "cancel"
    "submit #user-create": "save"

  save: (e) ->
    e.preventDefault()
    model = new app.User 
      firstname: @$("#firstname").val()
      lastname: @$("#lastname").val()
      email: @$("#email").val()
      entitlement: 25 # @$("#entitlement").val()
      startdate: @$("#startdate").val()
      enddate: ""
      active: true # @$("#active").val()
  
    @collection.create(model, {wait: true})
    # alert retval
    # model.save()
    @clear()
    app.vent.trigger "main:admin"
      
  clear: ->
    @$("#firstname").val ""
    @$("#lastname").val ""
    @$("#email").val ""
    @$("#entitlement").val ""
    @$("#startdate").val ""
    @$("#active").val ""

  cancel: (e) ->
    e.preventDefault()
    app.vent.trigger "main:admin"
    
@app.UserCreateView = UserCreateView


class UserNavigationView extends Backbone.Marionette.ItemView
  template: "#tmpl-user-navigation"
  className: "row" 

  events:
    "click #create": "create"

  create: (e) ->
    e.preventDefault()
    app.vent.trigger "admin:create"
      
@app.UserNavigationView = UserNavigationView
  

class UsersLayoutView extends Backbone.Marionette.ItemView
  template: "#tmpl-users-layout"

  onShow: () ->
    app.addRegions
      navigationRegion: "#user-navigation-region",
      listRegion: "#user-list-region"

    userNavigationView = new app.UserNavigationView
    app.navigationRegion.show(userNavigationView)
    
    # app.users.fetch(
    userListView = new app.UserListView
      collection: app.users

    app.listRegion.show(userListView)
      

@app.UsersLayoutView = UsersLayoutView

# End of user views

# Main navigation menu views

class MainNavigationMenuView extends Backbone.Marionette.ItemView
  template: "#tmpl-main-navigation-menu"
  className: "navbar"

  events:
    "click #main-admin": "adminClick"
    "click #main-home": "homeClick"

  adminClick: (e) ->
    e.preventDefault()
    app.vent.trigger "main:admin"

  homeClick: (e) ->
    e.preventDefault()
    app.vent.trigger "admin:home"

@app.MainNavigationMenuView = MainNavigationMenuView

# End of main navigation menu views