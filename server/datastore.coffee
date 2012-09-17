class DataStore

  constructor: ->

    @mongoose = require 'mongoose'
    @con = @mongoose.connect 'mongodb://localhost:8120/ekmHoliCal'
    @schemas = require './schemas' 

module.exports = DataStore