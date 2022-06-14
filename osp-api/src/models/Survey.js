const mongoose = require('mongoose')

const Question = new mongoose.Schema({
  title: String,
  format: String
})

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  token: { type: String, required: true },
  questions: [Question],
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Survey', schema)
