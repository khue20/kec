import { Schema, model } from 'mongoose'
const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  bookTiketButton: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  }
}, { timestamps: true })
const Event = model('Event', eventSchema, 'Event')
export default Event