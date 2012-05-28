define (require) ->
  
  require 'jqueryUI'
  require 'jqueryQtip'

  Utils = require '../../scripts/Utils.js' 
  Departments = require '../../scripts/collections/collection.departments.js'

  class UserMaintenanceView extends Backbone.Marionette.ItemView
    className: "row"
    
    initialize: =>
      @viewModel = @options.viewModel 
      @template = require '../../scripts/text!user_maintenance.html'

      @model.on 'change:email', @SetGravatarImage, @
      # @on 'reset:departments', @refresh, @

      # @model.on 'change:department', (model, newDepartment) => console.log "Department changed:" + newDepartment


    events:
      "click #cancel-button": "cancel"
      "submit #user-create": "save"
      "focus #enddate": "showDatePicker"

    refresh: =>
      @render()
      @onShow()

    save: (e) ->
      e.preventDefault()
      @model = @viewModel.model()

      modelValid = @model.isValid(true)
      console.log "Is model valid:" + modelValid

      if modelValid
        @model.save(
          @model.toJSON(),
          error: (model, res) -> 
            alert res.responseText
        )
        app.vent.trigger "main:admin:users"      

    cancel: (e) ->
      e.preventDefault()
      app.vent.trigger "main:admin:users"

    onShow: =>
      ko.applyBindings(@viewModel, @el)
      Backbone.Validation.bind(@, forceUpdate: true) 
      @SetGravatarImage()
     
    getGravatarURL: =>
      "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(@model.get("email"))
    
    SetGravatarImage: =>
      $("#user-gravatar").attr "src", @getGravatarURL()  

    showDatePicker: ->
      $('#enddate').datepicker
        constrainedInput: true
        dateFormat: 'dd/mm/yy'
        changeMonth: true
        changeYear: true 
        showButtonPanel: true

    hideDatePicker: ->
      $('#enddate').datepicker('hide')

    close: =>
      @hideDatePicker()
      super


