(function() {

  $(function() {
    var User, UserItemView, UserListView, UserView, Users, user, userListView, userView, users;
    User = Backbone.Model.extend({});
    Users = Backbone.Collection.extend({
      model: User,
      url: "/ekmHolical/Users"
    });
    UserItemView = Backbone.View.extend({
      tagName: "li",
      initialize: function() {
        _.bindAll(this, "render", "show", "remove");
        return this.template = $("#user-list-item-template");
      },
      events: {
        "click .edit": "show",
        "click .remove": "remove"
      },
      remove: function() {
        return this.model.destroy();
      },
      show: function(e) {
        return alert(this.model.get("username"));
      },
      render: function() {
        this.template.tmpl(this.model.toJSON()).appendTo(this.el);
        return this;
      }
    });
    UserListView = Backbone.View.extend({
      tagName: "ul",
      initialize: function() {
        _.bindAll(this, "render");
        this.collection.bind("add", this.render);
        this.collection.bind("remove", this.render);
        this.collection.bind("reset", this.render);
        return this.render();
      },
      render: function() {
        var els;
        els = [];
        this.collection.each(function(model) {
          var view;
          view = new UserItemView({
            model: model
          });
          return els.push(view.render().el);
        });
        $(this.el).empty();
        $(this.el).append(els);
        return this;
      }
    });
    UserView = Backbone.View.extend({
      initialize: function() {
        _.bindAll(this, "render");
        this.template = $("#userTemplate");
        return this.render();
      },
      events: {
        "submit #add-edit-form": "save"
      },
      save: function(e) {
        var model;
        e.preventDefault();
        model = new User({
          username: this.$("#username").val(),
          address1: this.$("#address1").val()
        });
        this.clear();
        return this.collection.add(model);
      },
      clear: function() {
        this.$("#username").val("");
        return this.$("#address1").val("");
      },
      render: function() {
        this.template.tmpl(this.model.toJSON()).appendTo(this.el);
        return this;
      }
    });
    user = new User();
    users = new Users();
    users.fetch();
    userListView = new UserListView({
      el: $("#list-item"),
      collection: users
    });
    userView = new UserView({
      el: $("#item"),
      model: user,
      collection: users
    });
  });

}).call(this);
