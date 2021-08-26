import { Schema, model } from 'mongoose'

const packageSchema = new Schema({
  ticket: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  qty: [{
    type: Number
  }]
}, { timestamps: true })

const Package = model('Package', packageSchema, 'Package')
export default Package