define (require) ->
  
  Backbone.ModelBinding = require 'modelbinding'
  require 'jqueryUI'
  require 'jqueryQtip'

  Utils = require '../../scripts/Utils.js' 

  class DepartmentMaintenanceView extends Backbone.Marionette.ItemView
    className: "row"
    
    initialize: ->
      @template = require '../../scripts/text!department_maintenance.html'

    events:
      "click #cancel-button": "cancel"
      "submit #department-create": "save"

    save: (e) ->
      e.preventDefault()
      modelValid = @model.isValid(true)
      console.log "Is model valid:" + modelValid

      if modelValid
        if @model.isNew() 
          res = @collection.create(@model, {wait: true}) 
        else
          @model.save(
            @model.attributes, 
            error: -> 
              alert "Error saving !!!" 
          )
        app.vent.trigger "main:admin:departments"      

    cancel: (e) ->
      e.preventDefault()
      app.vent.trigger "main:admin:departments"

    onShow: ->
      Backbone.ModelBinding.bind(@)  
      Backbone.Validation.bind(@, forceUpdate: true) 