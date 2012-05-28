define (require) ->
  
  routeMain = require '../scripts/routers/router.main.js'
  routeUser = require '../scripts/routers/router.user.js'
  routeDepartment = require '../scripts/routers/router.department.js'

  MainNavigationMenuView = require '../scripts/views/view.main.navigation'


  ##### This works in app.js #####
  # NestedModel = Backbone.RelationalModel.extend({
  #   defaults: {
  #     Description: 'A NestedModel description'
  #   }
  # });

  # MainModel = Backbone.RelationalModel.extend({
  #   defaults: {
  #     Description: 'A MainModel description',
  #     enddate: null
  #   },

  #   relations: [{
  #     type: Backbone.HasOne,
  #     key: 'nestedmodel',
  #     relatedModel: 'NestedModel',
  #     includeInJSON: '_id',
  #     reverseRelation: {
  #       type: Backbone.HasOne,
  #       key: 'mainmodel'
  #     }
  #   }]
  # });
    
  # nm = new NestedModel();
  # mm = new MainModel({nestedmodel: nm});
  # console.log(mm.get("nestedmodel").get("mainmodel").get("Description"));
  # return ;

  # class NestedModel extends Backbone.RelationalModel
  #   defaults:
  #    Description: 'A nested model'

  # NestedModel.setup()

  # class MainModel extends Backbone.RelationalModel
  #   defaults:
  #    Description: 'A MainModel description'
  #    enddate: null

  #   relations: [
  #     type: Backbone.HasOne
  #     key:  'nestedmodel'
  #     relatedModel: 'NestedModel'
  #     includeInJSON: '_id'
  #     reverseRelation:
  #       type: Backbone.HasOne
  #       includeInJSON: '_id'
  #       key: 'mainmodel'   
  #   ]

  # MainModel.setup()     

  # nm = new NestedModel()
  # mm = new MainModel(nestedmodel: nm)
  # console.log mm.get("nestedmodel").get("mainmodel").get("Description")
  # return 


  window.app = if not window.app then new Backbone.Marionette.Application() else window.app        

  app.bind "initialize:before", (options) ->
    Backbone.Marionette.TemplateCache.loadTemplate = 
        (template, callback) => 
          compiledTemplate = Handlebars.compile($(template).html()) 
          callback.call(@, compiledTemplate)

    Backbone.Marionette.Renderer.renderTemplate = (template, data) -> template(data) 

  app.addInitializer () ->
    app.data = {}
    mainNavMenuView = new MainNavigationMenuView()
    app.mainNavigationMenuRegion.show(mainNavMenuView)

    app.mainRouter = new routeMain.MainRouter(controller: new routeMain.MainController)
    app.userRouter = new routeUser.UserRouter(controller: new routeUser.UserController)  
    app.departmentRouter = new routeDepartment.DepartmentRouter(controller: new routeDepartment.DepartmentController)  

  app.bind "initialize:after", () ->
    if Backbone.history
      Backbone.history.start()

  app.addRegions 
    mainNavigationMenuRegion: "#main-navigation-menu",
    mainRegion: "#main-content-region"

  app.vent.on "main:home", () -> app.mainRouter.navigate("", true)
  app.vent.on "main:admin", () -> app.mainRouter.navigate("admin", true)

  app.vent.on "main:admin:users", () -> app.userRouter.navigate("admin/users", true)
  app.vent.on "admin:users:create", () -> app.userRouter.navigate("admin/users/create", true)
  app.vent.on "admin:users:edit", (id) -> app.userRouter.navigate("admin/users/edit/" + id, true)

  app.vent.on "main:admin:departments", () -> app.departmentRouter.navigate("admin/departments", true)
  app.vent.on "admin:departments:create", () -> app.departmentRouter.navigate("admin/departments/create", true)
  app.vent.on "admin:departments:edit", (id) -> app.departmentRouter.navigate("admin/departments/edit/" + id, true)


  app.start()    
