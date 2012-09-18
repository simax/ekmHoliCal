class EmployeeRoutes

  constructor: ->
    @Model = global.schemas.DepartmentSchemaModel

  put: (req, res) =>
    @Model.findOne { 'employees._id' : req.params.id}, (err, department) =>
      entity = department.employees.id(req.params.id)
      @modelBind(entity, req)
      department.save (err) =>
        console.log err if err
        res.send(200)
 
  post: (req, res) =>
    entity = new @Model
    @modelBind(entity, req)
    entity.save (err) =>
      @save(entity, res, err)
 
  getall: (req, res) => 
    res.contentType 'application/json'
    @Model.find().exec (err, data) -> 
      res.send err if err
      res.send data
 
  get: (req, res) => 
    @Model
    .findById(req.params.id)
    .run (err, entity) ->
      res.send(entity)
        
  delete: (req, res) =>
    @Model.findOne { 'employees._id' : req.params.id}, (err, entity) ->
      entity.employees.id(req.params.id).remove()
      console.log entity
      entity.save (err) =>
        console.log err if err
        res.send(204)

  modelBind: (entity, req) =>
    entity.firstname = req.body.firstname
    entity.lastname = req.body.lastname
    entity.email = req.body.email
    entity.enddate = req.body.enddate
    entity.active = req.body.active
    entity.ModelId = req.body.ModelId

  save: (entity, res, err) -> 
    if err 
      console.log err 
      if err.code = 1101
        res.send("Unable to save", 400) 
        return
      res.send("Unable to process request", 500) 
    else
      res.send(entity)  

exports.EmployeeRoutes = EmployeeRoutes

