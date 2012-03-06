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
    id = @model.id
    app.vent.trigger "admin:edit", id  
  
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

class UserMaintenanceView extends Backbone.Marionette.ItemView
  template: "#tmpl-user-maintenance"
  className: "row"
  
  onRender: ->
    Backbone.ModelBinding.bind(@)  
    Backbone.Validation.bind(@)
    
  events:
    "click #cancel-button": "cancel"
    "submit #user-create": "save"
    "focus #startdate": "showDatePicker"

  showDatePicker: ->
    $('#startdate').datepicker
      constrainedInput: true
      dateFormat: 'dd/mm/yy'
      changeMonth: true
      changeYear: true 
      showButtonPanel: true

  save: (e) ->
    e.preventDefault()
    modelValid = @model.isValid(true)
    console.log "Is model valid:" + modelValid

    if modelValid
      if @model.isNew() 
        @collection.create(@model, {wait: true}) 
      else
        @model.save()  
      app.vent.trigger "main:admin"      

  cancel: (e) ->
    e.preventDefault()
    app.vent.trigger "main:admin"
    
@app.UserMaintenanceView = UserMaintenanceView


class UserNavigationView extends Backbone.Marionette.ItemView
  template: "#tmpl-user-navigation"
  className: "row" 

  events:
    "click #create": "create"

  create: (e) ->
    e.preventDefault()
    app.vent.trigger "admin:create"
      
@app.UserNavigationView = UserNavigationView
   

class UsersLayoutView extends Backbone.Marionette.CompositeRegion
  template: "#tmpl-users-layout"

  regions:
    navigationRegion: "#user-navigation-region"
    listRegion: "#user-list-region"

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