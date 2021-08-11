import { Schema, model } from 'mongoose'

const businessMasterySchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  facebookName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  }
}, { timestamps: true })
const BusinessMastery = model('BusinessMastery', businessMasterySchema, 'BusinessMastery')
export default BusinessMastery