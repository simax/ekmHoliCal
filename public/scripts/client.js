(function() {

  Backbone.LayoutManager.configure({
    render: function(template, context) {
      return Handlebars.compile(template)(context);
    }
  });

  $(function() {
    var main;
    app.user = new app.User();
    main = new Backbone.LayoutManager({
      name: "#main"
    });
    app.users.fetch().success(function() {
      main.views[".list"] = new app.UserListView({
        collection: app.users
      });
      main.render(function(content) {
        return $(".container").html(content);
      });
    });
  });

}).call(this);
