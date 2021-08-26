import { Request, Response } from 'express'
import Package from '@/models/Package'

const packageController = {
  addPackage: async (req: Request, res: Response) => {
    const { ticket, price, qty } = req.body
    try {
      const isCheck = await Package.findOne({ ticket })
      if (isCheck) return res.status(409).json({ message: 'Duplicate ticket' })
      const addPackage = new Package({
        ticket, price, qty
      })
      await addPackage.save()
      res.status(200).json({ addPackage })
    } catch (er) {
      return res.status(509).json({ message: er })
    }
  },
  getPackage: async (req: Request, res: Response) => {
    try {
      const getPackage = await Package.find()
      const mapper = getPackage.map((i: any) => {
        return {
          _id: i._id,
          Ticket: i.ticket,
          price: i.price,
          qty: i.qty.join(', ')
        }
      })
      res.status(200).json({ mapper })
    } catch (e) {
      res.status(500).send(e)
    }
  },
  updatePackage: async (req: Request, res: Response) => {
    const { _id, ticket, price, qty } = req.body
    try {
      const updatePackage = await Package.findByIdAndUpdate(_id, {
        $set: {
          ticket, price, qty
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ updatePackage })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  deletePackage: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await Package.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  },
  editPackage: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await Package.findById(id)
      res.status(200).json({ getEdit })
    } catch (er) {
      res.status(500).send(er)
    }
  }
}
export default packageController