/**
 *  Define Event shema
 */

const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  event: {type: String, required: true, trim: true},
  eventPlaceName: {type: String, required: true},
  eventDescription: {type: String, required: true},
  eventDate: {type: String, required: true},
  eventLocation: String,
  eventPrice: String,
  eventSpace: String,
  eventAvatar: String,
},{
  timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event