import { Schema, model } from 'mongoose'

const speakerSchema = new Schema({
  profile: {
    type: String,
    required: true
  },
  speakerName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Speaker = model('Speaker', speakerSchema, 'Speaker')
export default Speaker