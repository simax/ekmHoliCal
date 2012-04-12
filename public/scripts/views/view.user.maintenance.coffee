define (require) ->
  
  Backbone.ModelBinding = require 'modelbinding'
  require 'jqueryUI'
  require 'jqueryQtip'

  Utils = require '../../scripts/Utils.js' 
  Departments = require '../../scripts/collections/collection.departments.js'

  class UserMaintenanceView extends Backbone.Marionette.ItemView
    className: "row"

    initialize: =>
      @template = require '../../scripts/text!user_maintenance.html'
      @model.on 'change:email', @SetGravatarImage, @
      @fetchDepartments()
      @on 'departments:fetched', @refresh, @

    events:
      "click #cancel-button": "cancel"
      "submit #user-create": "save"
      "focus #startdate": "showDatePicker"

    refresh: =>
      @render()
      @onShow()
 
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
        app.vent.trigger "main:admin:users"      

    cancel: (e) ->
      e.preventDefault()
      app.vent.trigger "main:admin:users"

    onShow: =>
      Backbone.ModelBinding.bind(@)  
      Backbone.Validation.bind(@, forceUpdate: true) 
      @SetGravatarImage()
      
    getGravatarURL: =>
      "http://www.gravatar.com/avatar/" + Utils.CreateMD5Hash(@model.get("email"))
    
    SetGravatarImage: =>
      $("#user-gravatar").attr "src", @getGravatarURL()  

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

    fetchDepartments: =>
      me = @
      Need a better way of accessing the department._id
      currentDepartmentId = if @model.toJSON().department._id then @model.toJSON().department._id else ""
      deps = new Departments()
      deps.fetch
        success: (collection, response) =>  
          collection.add({name: ''}, {silent: true})
          collection.comparator = (model) -> model.get('name')
          collection.sort()
          me.model.attributes.departments = collection.toJSON()
          me.model.set({departmentId: currentDepartmentId}, {silent: true}) 
          @trigger "departments:fetched"  