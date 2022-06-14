const Response = require('../models/Response')
const _ = require('lodash')

const { parse } = require('json2csv')

module.exports = {
  async createResponse({ ...newResponse }) {
    const currentDate = new Date()
    const response = await Response.create({
      ...newResponse,
      createdAt: currentDate
    })

    return response
  },

  async getResponses({
    filters = {},
    pagination: { next, prev, limit = 10, page } = {}
  } = {}) {
    let query = Response.where(filters).sort({ startTime: -1 })

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

    const totalRecord = await Response.where(filters).count()

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

  async getResponsesCSV(token) {
    let allResponses = await Response.find({ token }).populate('survey')
    let message
    if (allResponses.length > 0) {
      const survey = allResponses[0].survey

      const questionTitles = survey.questions.map((q) => q.title)

      allResponses = allResponses.map(function (response) {
        const answers = response.answers
        response.answers = []

        for (let i = 0; i < questionTitles.length; i++) {
          response[`${questionTitles[i]}`] = answers[i]
        }

        return response
      })

      let csv
      try {
        csv = parse(allResponses, {
          fields: [
            'token',
            { label: 'title', value: 'survey.title', default: 'NULL' },
            { label: 'date', value: 'survey.createdAt', default: 'NULL' },
            ...questionTitles
          ]
        })
      } catch (err) {
        console.log(err)
        return { result: false, message: 'error' }
      }

      return csv
    } else {
      message = 'No Records from token'
    }

    return { result: false, message }
  },

  async removeResponseById(id) {
    const response = await Response.findById(id).exec()
    if (response) {
      await response.deleteOne()
    }
    return response
  }
}
