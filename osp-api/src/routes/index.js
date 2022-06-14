const express = require('express')
const { logger } = require('express-winston')
const router = express.Router()

const { APP_VERSION } = require('../../config')

router.get('/', (req, res) => {
  res.json({
    version: APP_VERSION
  })
})


module.exports = router
