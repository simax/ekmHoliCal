define (require) ->

  Backbone = require 'backbone'

  # require 'text!../../templates/tmpl.users.layout.html'

  class UsersLayoutView extends Backbone.Marionette.CompositeRegion
    template: "#tmpl-users-layout"

    regions:
      navigationRegion: "#user-navigation-region"
      listRegion: "#user-list-region"

  UsersLayoutView