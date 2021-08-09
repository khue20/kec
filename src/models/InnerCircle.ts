import { Schema, model } from "mongoose"
const innerCircleSchema = new Schema({
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
  website: {
    type: String,
    required: true
  },
  turNover: {
    type: String,
    required: true
  },
  noOfStaff: {
    type: String,
    required: true
  },
  descriptions: {
    type: String,
    required: true
  }
}, { timestamps: true })

const InnerCircle = model('InnerCircle', innerCircleSchema, 'InnerCircle')

export default InnerCircle
