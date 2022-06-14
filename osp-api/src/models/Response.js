const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  token: { type: String, required: true },
  survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey' },
  answers: [],
  createdAt: Date
})

module.exports = mongoose.model('Response', schema)
