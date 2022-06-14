const winston = require('winston')

const { buildName } = require('../../config')

let format
if (buildName === 'local') {
  format = winston.format.combine(
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    winston.format.printf((info) => {
      const { level, message, stack, ...rest } = info
      let log = `[${level}]: ${message}`
      if (Object.keys(rest).length !== 0) {
        log = `${log} ${JSON.stringify(rest)}`
      }
      if (stack) {
        log = `${log}\n${stack}`
      }
      return log
    })
  )
} else {
  format = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  )
}

const logger = winston.createLogger({
  level: buildName === 'local' ? 'debug' : 'info',
  format,
  transports: [new winston.transports.Console()]
})

module.exports = logger
