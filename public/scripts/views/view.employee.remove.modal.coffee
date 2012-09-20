define (require) ->

  require '../../scripts/libs/bootstrap/js/bootstrap.min.js'

  class EmployeeRemoveModalView extends Backbone.Marionette.ItemView
    template: "#tmpl-employee-remove-modal"

    initialize: ->
      @modelBinder = new Backbone.ModelBinder()
      @template = require '../../scripts/text!employee_remove_modal.html'

    events:
      "click .remove-confirmed": "removeEmployee" 

    removeEmployee: (e) =>
      alert "Remove #{@model.get('fullname')}."
      # $('#removeModal').modal('hide')
      # @model.destroy()

    onRender: =>
      @modelBinder.bind(@model, @el) 
      $('#removeModal').modal('show')

    onClose: =>
      @modelBinder.unbind() 