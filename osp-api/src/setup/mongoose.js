const mongoose = require('mongoose')

const logger = require('../utils/logger')
const {
  mongo: { connetionStr, host, port, database, username, password }
} = require('../../config')

module.exports = async function initMongoose() {
  let connStr
  logger.info('Connecting to mongodb', { host, database, username })
  logger.info('Connect to MongoDB (Connection String)', connetionStr)
  if (connetionStr) {
    connStr = connetionStr
  } else if (username && password) {
    connStr = `mongodb://${username}:${password}@${host}:${port}/${database}`
  } else {
    connStr = `mongodb://${host}:${port}/${database}`
  }

  return mongoose.connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
