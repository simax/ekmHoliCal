define (require) ->
  
  require 'text!../templates/tmpl.department.maintenance.html'

  class DepartmentMaintenanceView extends Backbone.Marionette.ItemView
    template: "#tmpl-department-maintenance"
    className: "row"
    
    onShow: ->
      Backbone.ModelBinding.bind(@)  
      Backbone.Validation.bind(@, forceUpdate: true) 

    events:
      "click #cancel-button": "cancel"
      "submit #user-create": "save"

    save: (e) ->
      e.preventDefault()
      modelValid = @model.isValid(true)
      console.log "Is model valid:" + modelValid

      if modelValid
        @model.save()  
        app.vent.trigger "main:admin"      

    cancel: (e) ->
      e.preventDefault()
      app.vent.trigger "main:admin"
    
  return DepartmentMaintenanceView
