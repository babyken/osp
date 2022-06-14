const Survey = require('../models/Survey')
const _ = require('lodash')

module.exports = {
  async createSurvey({ ...newSurvey }) {
    const currentDate = new Date()
    const survey = await Survey.create({
      ...newSurvey,
      createdAt: currentDate
    })

    return survey
  },

  async getSurveys({
    filters = {},
    pagination: { next, prev, limit = 10, page } = {}
  } = {}) {
    let query = Survey.where(filters).sort({ startTime: -1 })

    if (next) {
      query = query.where({
        _id: { $gt: next }
      })
    } else if (prev) {
      query = query.where({
        _id: { $lt: prev }
      })
    } else if (page) {
      query = query.skip((page - 1) * limit)
    }
    const result = await query.limit(limit).find()

    const totalRecord = await Survey.where(filters).count()

    return {
      items: result,
      pagination: {
        next: !_.isEmpty(result) ? result[result.length - 1]._id : null,
        prev: !_.isEmpty(result) ? result[0]._id : null,
        limit,
        page,
        totalRecord,
        totalPage: Math.ceil(totalRecord / limit)
      }
    }
  },

  async getSurveyByToken(token) {
    const survey = await Survey.findOne({ token })
    return survey
  },

  async updateSurvey(...amendedSurvey) {
    const { title, token, questions } = { ...amendedSurvey }[0]
    const survey = await this.getSurveyByToken(token)

    survey.title = title
    survey.questions = questions
    survey.updatedAt = new Date()
    return survey.save()
  },

  async removeSurveyByToken(token) {
    const survey = await Survey.findOne({ token }).exec()
    if (survey) {
      await survey.deleteOne()
    }
    return survey
  },

  validateSurvey(survey) {
    if (survey.token.length != 5) {
      return 'invalid token length'
    } else if (!/^[A-Za-z0-9]*$/.test(survey.token)) {
      return 'invalid characters in token, please use 5 random characters (alphabet and number)'
    } else if (survey.questions.length == 0) {
      return 'Please enter questions'
    } else if (
      survey.questions.filter((q) => q.title.length == 0).length != 0
    ) {
      return "Missing question's title"
    }

    return true
  }
}
