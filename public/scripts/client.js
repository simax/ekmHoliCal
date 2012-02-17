(function() {

  $(function() {
    app.bind("initialize:before", function(options) {
      return Backbone.Marionette.ItemView.prototype.renderTemplate = function(template, data) {
        return template.tmpl(data);
      };
    });
    app.addRegions({
      listRegion: "#list"
    });
    app.addInitializer(function() {
      var userListView;
      userListView = new this.UserListView({
        collection: this.users
      });
      return this.listRegion.show(userListView);
    });
    return app.start();
  });

}).call(this);
