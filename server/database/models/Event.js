/**
 *  Define Event shema
 */

const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  event: {type: String, required: true, trim: true},
  eventDescription: {type: String, required: true},
  eventDate: {type: Date, default: Date.now, required: true},
  eventLocation: String,
  eventPrice: String,
  eventAvatar: String,
  assists: [mongoose.Schema.Types.ObjectId],
},{
  timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event