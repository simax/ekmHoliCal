(function() {

  $(function() {
    var userListView, userView;
    app.users.fetch();
    app.user = new app.User();
    userListView = new app.UserListView({
      el: $("#list-item"),
      collection: app.users
    });
    userView = new app.UserView({
      el: $("#item"),
      model: app.user,
      collection: app.users
    });
  });

}).call(this);
