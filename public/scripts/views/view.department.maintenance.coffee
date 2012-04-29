define (require) ->
  
  require 'jqueryUI'
  require 'jqueryQtip'

  Utils = require '../../scripts/Utils.js' 

  class DepartmentMaintenanceView extends Backbone.Marionette.ItemView
    className: "row"
    
    initialize: ->
      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!department_maintenance.html'

    events:
      "click #cancel-button": "cancel"
      "submit #department-create": "save"

    save: (e) ->
      e.preventDefault()
      modelValid = @model.isValid(true)
      console.log "Is model valid:" + modelValid

      if modelValid
        @model.save(
          @model.attributes,
          error: (model, res) -> 
            alert res.responseText
        )
        app.vent.trigger "main:admin:departments"      

    cancel: (e) ->
      e.preventDefault()
      app.vent.trigger "main:admin:departments"

    onShow: =>
      @modelBinder.bind(@model, @el)  
      Backbone.Validation.bind(@, forceUpdate: true) 

    onClose: =>
      @modelBinder.unbind()  