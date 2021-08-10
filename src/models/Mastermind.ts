import { Schema, model } from "mongoose"

const mastermindSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  reVenue: {
    type: String,
    required: true
  },
  website: {
    type: String
  }
}, { timestamps: true })

const Mastermind = model('Mastermind', mastermindSchema, 'Mastermind')

export default Mastermind
