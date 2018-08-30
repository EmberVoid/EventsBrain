const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

const asyncMiddleware = require('../helpers/middleware')
const eventsController = require('../controllers/eventsController')

// events endpoints
router.get('/', asyncMiddleware(eventsController.getEvents))
router.get('/:id', asyncMiddleware(eventsController.getEventById))
router.post('/addevent', asyncMiddleware(eventsController.createEvent))
router.put('/:id', asyncMiddleware(eventsController.updateEventById))
router.delete('/:id', asyncMiddleware(eventsController.deleteEventById))

module.exports = router
