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
  const events = await Event.find().sort({createdAt: -1})
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
  const event = await Event.findByIdAndUpdate(req.params.id, {
    $set: { 
      event: req.body.event, 
      eventDescription: req.body.eventDescription, 
      eventDate: req.body.eventDate, 
      eventLocation: req.body.eventLocation, 
      eventPrice: req.body.eventPrice, 
      eventAvatar: req.body.eventAvatar,
    }
  }).exec()
  respond(res, 200, { event })
}

async function addAssistById(req, res) {
  const event = await Event.findByIdAndUpdate(req.params.id, {
    $push: { assists: req.body.assists}
  }).exec()
  respond(res, 200, { event })
}

async function RemoveAssistById(req, res) {
  const event = await Event.findByIdAndUpdate(req.params.id, {
    $pullAll: { assists: [ req.body.assists ] }
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
  addAssistById,
  RemoveAssistById,
  deleteEventById
}