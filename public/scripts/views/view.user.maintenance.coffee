define (require) ->
  
  require 'jqueryUI'
  require 'jqueryQtip'

  Utils = require '../../scripts/Utils.js' 
  Departments = require '../../scripts/collections/collection.departments.js'

  class UserMaintenanceView extends Backbone.Marionette.ItemView
    className: "row"
    
    initialize: =>
      @fetchDepartments()

      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!user_maintenance.html'
      @model.on 'change:email', @SetGravatarImage, @
      
      @on 'departments:fetched', @refresh, @

      # @model.on 'change', @ModelChanged, @
      @model.on 'change:department', (model, newDepartment) => console.log "Department changed:" + newDepartment

    events:
      "click #cancel-button": "cancel"
      "submit #user-create": "save"
      "focus #startdate": "showDatePicker"

    refresh: =>
      @render()
      @onShow()

    ModelChanged: =>
      # console.log "firstname: " + "[" + @model.get("firstname") + "]"   
      # console.log "lastname: " + "[" + @model.get("lastname") + "]"   
      # console.log "departmentId: " + "[" + @model.get("departmentId") + "]"   
      console.log @model

    save: (e) ->
      e.preventDefault()
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
      col = @model.get("departments")
      bindings = 
        firstname: '[name=firstname]'
        lastname: '[name=lastname]'
        email: '[name=email]'
        startdate: '[name=startdate]'
        active: '[name=active]'
        'department' : '[name=department]' 
        # department: 
        #   selector: '[name=department]', converter: new Backbone.ModelBinder.CollectionConverter(col).convert
      
      @modelBinder.bind(@model, @el, bindings)  
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
      # currentDepartmentId = @model.get("department")._id if @model.get("department")
      currentDepartment = @model.get("department") 
      # console.log "currentDepartment: "  + currentDepartment.get("id")
      deps = new Departments()
      deps.fetch
        success: (collection, response) =>  
          collection.add({name: ''}, {silent: true})
          collection.comparator = (model) -> model.get('name')
          collection.sort()
          me.model.set({departments: collection.toJSON()})
          console.log "Changing department"
          # me.model.set({department: currentDepartment.get("id")})   
          @trigger "departments:fetched"  

    onClose: =>
      @modelBinder.unbind()     
