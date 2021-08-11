import { Schema, model } from "mongoose"
const bannerSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  bannerTypeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BannerType'
  },
  onlineDate: {
    type: Date,
    required: true
  },
  closeDate: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

const Banner = model('Banner', bannerSchema, 'Banner')

export default Banner