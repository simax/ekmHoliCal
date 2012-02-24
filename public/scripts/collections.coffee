
class Users extends Backbone.Collection
  model: app.User 
  url: "/ekmHolical/users"

@app = window.app ? new Backbone.Marionette.Application()
@app.Users = Users 
@app.users = new @app.Users 
@app.users.fetch()
