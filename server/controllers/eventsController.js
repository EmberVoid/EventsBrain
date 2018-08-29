/**
 * API events controller
 */
const mongoose = require('mongoose')
require(__dirname+'./../database/models/Event')
const Event = mongoose.model('Event')

// JSON response utility function
const respond = function(res, status, content) {
  res.status(status)
  res.json(content)
}

async function getEvents(req, res) {
  const events = await Event.find()
  respond(res, 200, { events })
  // const events = await Event.find().populate('customerName', 'name')
}

async function getEventById(req, res) {
  const event = await Event.findById(req.params.id)
  respond(res, 200, { event })
}

async function createEvent(req, res) {
  const event = new Event(req.body)
  await event.save()
  respond(res, 201, { event })
}

async function updateEventById(req, res) {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).exec()
  respond(res, 200, { event })
}

async function deleteEventById(req, res) {
  const event = await Event.findByIdAndDelete(req.params.id)
  respond(res, 204, {})
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById
}