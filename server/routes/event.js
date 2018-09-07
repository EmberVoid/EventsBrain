const express = require('express')
const router = express.Router()

const asyncMiddleware = require('../helpers/middleware')
const eventsController = require('../controllers/eventsController')

// events endpoints
router.get('/', asyncMiddleware(eventsController.getEvents))
router.get('/:id', asyncMiddleware(eventsController.getEventById))
router.post('/addevent', asyncMiddleware(eventsController.createEvent))
router.put('/assist/:id', asyncMiddleware(eventsController.addAssistById))
router.put('/assist/del/:id', asyncMiddleware(eventsController.RemoveAssistById))
router.delete('/:id', asyncMiddleware(eventsController.deleteEventById))

module.exports = router
