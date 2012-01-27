
class Users extends Backbone.Collection
  model: app.User 
  url: "/ekmHolical/Users"

@app = window.app ? {}
@app.users = new Users 