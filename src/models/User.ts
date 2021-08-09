import { Schema, model } from 'mongoose'
const userSchema = new Schema({
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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  isBann: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })
const User = model('User', userSchema, 'User')
export default User