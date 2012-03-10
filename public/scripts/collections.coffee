
class Users extends Backbone.Collection
  model: app.User 
  url: "/ekmHoliCal/api/users"

@app = window.app ? new Backbone.Marionette.Application()
@app.Users = Users 
@app.users = new @app.Users 
@app.users.fetch()


class Departments extends Backbone.Collection
  model: app.Department
  url: "/ekmHoliCal/api/departments"

@app = window.app ? new Backbone.Marionette.Application()
@app.Departments = Departments 
@app.departments = new @app.Departments 
@app.departments.fetch()
