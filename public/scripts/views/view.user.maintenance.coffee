define (require) ->
  
  require 'jqueryUI'
  require 'jqueryQtip'
  require 'select2'

  Utils = require '../../scripts/Utils.js' 
  Departments = require '../../scripts/collections/collection.departments.js'
  Department = require '../../scripts/models/model.department.js'

  class UserMaintenanceView extends Backbone.Marionette.ItemView
    className: "row"
    
    initialize: =>
      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!user_maintenance.html'

      @model.on 'change:email', @SetGravatarImage, @
      @model.get("departments").on 'reset', @departmentsLoaded, @
      @model.on 'validated:invalid', @validationFailed, @


    validationFailed: (model, attrs) =>
      # Array::remove = (e) -> @[t..t] = [] if (t = @indexOf(e)) > -1
      if _.indexOf attrs, "departmentId"
        attrs.remove "departmentId"
        $(".invalid").removeAttr('data-error').removeClass("invalid") 

    events:
      "click #cancel-button": "cancel"
      "submit #user-maintenance": "save"
      "focus #enddate": "showDatePicker"

    departmentsLoaded: =>
      # add a blank departmrnt to the start of the departments collection
      @model.get("departments").unshift new Department()   
      @refresh() 

      
    refresh: =>
      @render()
      @onShow()

    save: (e) ->
      e.preventDefault()
      modelValid = true # @model.isValid(true)

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
      @modelBinder.bind(@model, @el) 
      # Backbone.Validation.bind(@, forceUpdate: true) 
      @SetGravatarImage()
      $('#departmentId').select2
        placeholder: "Select a department"
    
    onClose: =>
      @modelBinder.unbind()   

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
