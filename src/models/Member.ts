import { Schema, model } from "mongoose"

const memberSchema = new Schema({
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
  reason: {
    type: String,
    required: true
  },
  memberShipOption: {
    type: String,
    required: true
  }
}, { timestamps: true })
const Member = model('Member', memberSchema, 'Member')

export default Member