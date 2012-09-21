define (require) ->

  require '../../scripts/libs/bootstrap/js/bootstrap.min.js'

  class EmployeeRemoveModalView extends Backbone.Marionette.ItemView

    initialize: ->
      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!employee_remove_modal.html'

    events:
      "click #remove-confirmed": "removeEmployee" 

    removeEmployee: (e) =>
      @model.destroy()
      $('#removeModal').modal('hide')

    onShow: =>
      @modelBinder.bind(@model, @el) 
      $('#removeModal').modal('show')

    onClose: =>
      @modelBinder.unbind() 
