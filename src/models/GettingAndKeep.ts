import { Schema, model } from 'mongoose'
const gettingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  bookTicketButtom: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  }
}, { timestamps: true })
const Getting = model('Getting', gettingSchema, 'Getting')
export default Getting