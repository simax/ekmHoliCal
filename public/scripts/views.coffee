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
    "click .active-status": "toggleActivation"

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
    
    @$el.html ""  
    @appendHtml @$el, $("script#tmpl-user-grid-header").tmpl() 
    @collection.each(@addChildView)
    @appendHtml @$el, "</tbody></table>"  

    if(@onRender) 
      @onRender()
    @
  
  # onRender: ->
  #   $("#user-list").dataTable
  #     sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
  #     sPaginationType: "bootstrap"
  #     oLanguage:
  #       sLengthMenu: "_MENU_ records per page"      


@app.UserListView = UserListView


class UserCreateView extends Backbone.Marionette.ItemView
  template: "#tmpl-user-maintenance"
  className: "row"
  
  onRender: ->
     Backbone.ModelBinding.bind(@)  
     Backbone.Validation.bind(@)  
  
  events:
    "click #cancel-button": "cancel"
    "submit #user-create": "save"

  save: (e) ->
    e.preventDefault()
    if not @model.isValid(true)
      alert "Invalid "  
    else
      @collection.create(@model, {wait: true})
      # @clear()
      app.vent.trigger "main:admin"
      
  # clear: ->
  #   @$("#firstname").val ""
  #   @$("#lastname").val ""
  #   @$("#email").val ""
  #   @$("#entitlement").val ""
  #   @$("#startdate").val ""
  #   @$("#active").val ""

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
    
    # app.users.fetch()
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