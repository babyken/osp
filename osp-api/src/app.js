const fs = require('fs')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const {
  express: { allowAnyOrigin, port },
  webBaseUrl
} = require('../config')

const logger = require('./utils/logger')
const initMongoose = require('./setup/mongoose')

const run = async () => {
  await initMongoose()

  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(
    cors({
      origin: allowAnyOrigin ? '*' : webBaseUrl
    })
  )

  const loadRoutes = (dirPath) => {
    const files = fs.readdirSync(path.join(__dirname, dirPath), {
      withFileTypes: true
    })
    files.forEach((file) => {
      if (file.isDirectory()) {
        loadRoutes(path.join(dirPath, file.name))
      } else if (file.isFile()) {
        const fileName = path.parse(file.name).name
        const routeName = fileName === 'index' ? '' : fileName
        const routePath = `${dirPath}/${routeName}`.replace(/^routes/, '')

        // eslint-disable-next-line
        app.use(routePath, require(path.join(__dirname, dirPath, file.name)))
        logger.info(`Added router: ${routePath}`)
      }
    })
  }
  loadRoutes('routes')

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404))
  })

  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    logger.error(err)
    res.status(err.status || 500)
    res.json({ error: err.message || 'Internal server error' })
  })

  // error handler
  // app.use(function (err, req, res, next) {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message
  //   res.locals.error = req.app.get('env') === 'development' ? err : {}

  //   // render the error page
  //   res.status(err.status || 500)
  //   logger.error(err)
  //   res.json({ msg: err })
  // })

  app.listen(port, '0.0.0.0', () => {
    logger.info(`server started at 0.0.0.0:${port}`)
  })
}

run()
