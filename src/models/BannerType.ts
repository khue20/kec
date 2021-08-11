import { Schema, model } from "mongoose"
const bannerTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true })

const BannerType = model('BannerType', bannerTypeSchema, 'BannerType')

export default BannerType