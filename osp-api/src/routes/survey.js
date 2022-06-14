const express = require('express')
const { logger } = require('express-winston')
const router = express.Router()
const SurveyService = require('../services/SurveyService')
const _ = require('lodash')

router.get('/', async (req, res) => {
  const query = _.isEmpty(req.query) ? undefined : JSON.parse(req.query.filters)

  const result = await SurveyService.getSurveys(query)
  res.json({
    result
  })
})

router.get('/:token', async (req, res) => {
  const survey = await SurveyService.getSurveyByToken(req.params.token)
  if (survey) {
    return res.json({ result: true, survey })
  }

  return res.json({ result: false, message: 'Survey not found' })
})

router.post('/', async (req, res) => {
  const validateResult = SurveyService.validateSurvey(req.body)
  if (validateResult === true) {
    const result = await SurveyService.createSurvey(req.body)

    res.json({
      result
    })
  }

  return res.json({
    result: false,
    message: validateResult
  })
})

router.put('/', async (req, res) => {
  const validateResult = SurveyService.validateSurvey(req.body)
  if (validateResult === true) {
    const result = await SurveyService.updateSurvey(req.body)

    res.json({
      result
    })
  }

  return res.json({
    result: false,
    message: validateResult
  })
})

router.delete('/:token', async (req, res) => {
  const result = await SurveyService.removeSurveyByToken(req.params.token)
  res.json({
    result
  })
})

module.exports = router
