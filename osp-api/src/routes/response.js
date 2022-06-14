const express = require('express')

const router = express.Router()
const ResponseService = require('../services/ResponseService')
const _ = require('lodash')

router.get('/', async (req, res) => {
  const query = _.isEmpty(req.query) ? undefined : JSON.parse(req.query.filters)

  const result = await ResponseService.getResponses(query)
  res.json({
    result
  })
})

router.get('/csv/:token', async (req, res) => {
  const csv = await ResponseService.getResponsesCSV(req.params.token)
  if (csv) {
    return res.attachment(`${req.params.token}-response.csv`).send(csv)
  }

  return res.json({ result: false, message: 'No Records' })
})

router.post('/', async (req, res) => {
  const result = await ResponseService.createResponse(req.body)

  res.json({
    result
  })
})

router.delete('/:id', async (req, res) => {
  const result = await ResponseService.removeResponseById(req.params.id)
  res.json({
    result
  })
})

module.exports = router
