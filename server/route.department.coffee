
class DepartmentRoutes
   
  constructor: ->
    @schemas = require('./schemas')
    @schemas = new @schemas()
    @Model =  @schemas.DepartmentSchemaModel

  post: (req, res) =>
    entity = new @Model
    @modelBind(entity, req)
    entity.save (err) =>
      @save(entity, res, err)
 
  getall: (req, res) =>
    res.contentType 'application/json'
    @Model
        .find()
        .populate('employees')
        .run (err, entity) ->
          res.send(entity)

    # @EmployeeModel
    #   .find()   
    #   .run (err, entity) =>
    #     @employees = entity
    #     @Model
    #       .find()
    #       .run (err, entity) =>
    #         @deps = _und.map entity, 
    #           (dept) => 
    #             @departmentId = dept._id
    #             @departmentEmployees = _und.filter @employees, 
    #               (employee) => 
    #                 # console.log employee.departmentId.toString() + ":" + @departmentId.toString() #if employee.departmentId == @departmentId
    #                 employee.departmentId.toString() == @departmentId.toString()
    #                 # employee #if employee.departmentId == dept._id
    #             dept.employees.push.apply(dept.employees, @departmentEmployees)
    #             dept.save()   
    #         res.send(@deps)


  get: (req, res) =>
    console.log "req.params.id: " + req.params.id + "req.body.id: " + req.body.id
    @Model.findById req.params.id, (err, entity) ->
      res.send(entity)

  put: (req, res) =>
    @Model.findById req.params.id, (err, entity) =>
      @modelBind entity, req
      entity.save (err) =>
        @save(entity, res, err)

  delete: (req, res) =>
    @Model.findById req.params.id, (err, entity) ->
      entity.remove()
      res.send(204)

  modelBind: (entity, req) =>
    entity.name = req.body.name

  save: (entity, res, err) -> 
    if err 
      console.log err 
      if err.code = 1101
        res.send("Already exists", 400) 
        return
      res.send("Unable to process request", 500) 
    else
      res.send(entity)    

exports.DepartmentRoutes = DepartmentRoutes

###
  
  post: (req, res) =>
    entity.save (err) =>
      @save(entity, res, err)
 
  getall: (req, res) =>
    db.collection "departments", (err, collection) ->
      console.log err if err   
      re.send err if err
      collection.find().toArray (err, docs) ->
        res.send docs
  
  get: (req, res) =>
    db.collection("departments").find {"_id" : req.params.id }, (err, doc) =>
      res.send err if err
      res.send doc


  put: (req, res) =>
    entity = {}
    @modelBind entity, req
    db.collection("departments").update { "_id" : entity._id  }, entity, false

  delete: (req, res) =>
    @Model.findById req.params.id, (err, entity) ->
      entity.remove()
      res.send(204)

  modelBind: (entity, req) =>
    entity._id = new dbMan.ObjectID(req.body._id) 
    entity.name = req.body.name
    entity.employees = req.body.employees

  save: (entity, res, err) -> 
    if err 
      console.log err 
      if err.code = 1101
        res.send("Already exists", 400) 
        return
      res.send("Unable to process request", 500) 
    else
      res.send(entity)    

exports.DepartmentRoutes = DepartmentRoutes
###