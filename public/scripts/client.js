(function() {

  Backbone.LayoutManager.configure({
    render: function(template, context) {
      return Handlebars.compile(template)(context);
    }
  });

  $(function() {
    app.user = new app.User();
    app.users.fetch().success(function() {
      var main, userListView;
      main = new Backbone.LayoutManager({
        name: "#main"
      });
      userListView = new app.UserListView({
        el: $(".list"),
        collection: app.users
      });
      return main.render(function(contents) {
        return $(".container").html(contents);
      });
    });
  });

}).call(this);
