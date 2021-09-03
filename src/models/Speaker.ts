import { Schema, model } from 'mongoose'

const speakerSchema = new Schema({
  profile: {
    type: String
  },
  speakerName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

const Speaker = model('Speaker', speakerSchema, 'Speaker')
export default Speaker