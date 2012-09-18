class EmployeeRoutes

  constructor: ->
    @Model = global.schemas.EmployeeSchemaModel

  put: (req, res) =>
    @Model.findById req.params.id, (err, entity) =>
      @modelBind entity, req
      entity.save (err) =>
        @save(entity, res, err)
 
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
    @Model.findById req.params.id, (err, entity) ->
      entity.remove()
      res.send(204)

  modelBind: (entity, req) =>
    entity.firstname = req.body.firstname
    entity.lastname = req.body.lastname
    entity.email = req.body.email
    entity.enddate = req.body.enddate
    entity.active = req.body.active
    entity.departmentId = req.body.departmentId

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

