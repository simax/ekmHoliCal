define (require) ->
  
  require 'jqueryUI'
  require 'jqueryQtip'
  require 'select2'

  Utils = require '../../scripts/Utils.js' 
  Departments = require '../../scripts/collections/collection.departments.js'
  Department = require '../../scripts/models/model.department.js'

  class EmployeeMaintenanceView extends Backbone.Marionette.ItemView
    className: "row"
    
    initialize: => 
      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!employee_maintenance.html'

      @model.on 'change:email', @SetGravatarImage, @
      @model.get("departments").on 'reset', @departmentsLoaded, @
      @model.on 'validated:invalid', @validationFailed, @


    validationFailed: (model, attrs) =>
      if _.indexOf attrs, "departmentId"
        attrs.remove "departmentId"
        $(".invalid").removeAttr('data-error').removeClass("invalid") 

    events:
      "click #cancel-button": "cancel"
      "submit #employee-maintenance": "save"
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
          error: (model, res) -> alert "Error: " + res.responseText if res.responseText isnt "OK"
        )
        app.vent.trigger "main:admin:employees"      

    cancel: (e) ->
      e.preventDefault()
      window.history.back()

    onShow: =>
      @modelBinder.bind(@model, @el) 
      Backbone.Validation.bind(@, forceUpdate: true) 
      @SetGravatarImage()
      $('#departmentId').select2
        placeholder: "Select a department"
    
    onClose: =>
      @modelBinder.unbind()   

    getGravatarURL: =>
      "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(@model.get("email"))
    
    SetGravatarImage: =>
      $("#employee-gravatar").attr "src", @getGravatarURL()  

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
