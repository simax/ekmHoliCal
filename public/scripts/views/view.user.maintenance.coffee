define (require) ->
  
  Backbone = require 'backbone'
  Backbone.ModelBinding = require 'modelbinding'
  require 'jqueryUI'
  require 'jqueryQtip'

  # require 'text!../../templates/tmpl.user.maintenance.html'
  Utils = require '../../scripts/Utils.js' 

  class UserMaintenanceView extends Backbone.Marionette.ItemView
    template: "#tmpl-user-maintenance"
    className: "row"

    initialize: ->
      @model.on 'change:email', @SetGravatarImage, @

    events:
      "click #cancel-button": "cancel"
      "submit #user-create": "save"
      "focus #startdate": "showDatePicker"
  
    getGravatarURL: =>
      "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(@model.get("email"))
    
    SetGravatarImage: =>
      $("#user-gravatar").attr "src", @getGravatarURL()  

    onShow: =>
      Backbone.ModelBinding.bind(@)  
      Backbone.Validation.bind(@, forceUpdate: true) 
      @SetGravatarImage()

    showDatePicker: ->
      $('#startdate').datepicker
        constrainedInput: true
        dateFormat: 'dd/mm/yy'
        changeMonth: true
        changeYear: true 
        showButtonPanel: true

    hideDatePicker: ->
      $('#startdate').datepicker('hide')

    close: =>
      @hideDatePicker()
      super

    save: (e) ->
      e.preventDefault()
      modelValid = @model.isValid(true)
      console.log "Is model valid:" + modelValid

      if modelValid
        if @model.isNew() 
          @collection.create(@model, {wait: true}) 
        else
          @model.save()  
        app.vent.trigger "main:admin:users"      

    cancel: (e) ->
      e.preventDefault()
      app.vent.trigger "main:admin:users"
    
  UserMaintenanceView
