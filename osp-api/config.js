module.exports = {
  APP_VERSION: process.env.APP_VERSION || '0.0.1',

  webBaseUrl: process.env.WEB_BASE_URL || 'http://localhost:3000',

  buildName: process.env.BUILD_NAME || 'local',

  express: {
    allowAnyOrigin: process.env.ALLOW_ANY_ORIGIN === 'true',
    port: process.env.PORT || 3001
  },

  mongo: {
    connetionStr: process.env.MONGO_CONNECTION_STR,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
}
