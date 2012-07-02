define (require) ->
  
  require 'jqueryUI'
  require 'jqueryQtip'

  Utils = require '../../scripts/Utils.js' 
  Departments = require '../../scripts/collections/collection.departments.js'

  class UserMaintenanceView extends Backbone.Marionette.ItemView
    className: "row"
    
    initialize: =>
      @template = require '../../scripts/text!user_maintenance.html'
      @viewModel = @options.viewModel 

      @initialDepartmentId = @model.get("departmentId") 

      @model.on 'change:email', @SetGravatarImage, @
      @model.get("departments").on 'reset', @departmentsLoaded, @

    events:
      "click #cancel-button": "cancel"
      "submit #user-maintenance": "save"
      "focus #enddate": "showDatePicker"

    departmentsLoaded: =>
      @model.set("departmentId", @initialDepartmentId) if @model.get("_id")? 
      
    refresh: =>
      @render()
      @onShow()

    save: (e) ->
      e.preventDefault()
      modelValid = @model.isValid(true)

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
      # ko.applyBindings(@viewModel, @el)
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
