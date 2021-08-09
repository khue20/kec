import { Request, Response } from 'express'
import { signToken } from '../../../../utils/jwt'
import User from '../../../../models/User'
import { genHash } from '../../../../utils/bcrypt'
const userController = {
  addUser: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    // console.log(req.body)
    try {
      const isEmail = await User.findOne({ email })
      if (isEmail) return res.status(409).json({ message: 'This email already registed!' })
      const genHashPassword = genHash(password)
      const addUsers = new User({
        firstName, lastName, email, password: genHashPassword, role: 'Admin'
      })
      await addUsers.save()
      res.status(200).json({ addUsers })
    } catch (er) {
      throw new Error(er)
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const auth = req.user
      const accessToken = signToken(auth)
      res.status(200).json({ accessToken })
    } catch (er) {
      throw new Error(er)
    }
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const Users: any = await User.find()
      const getUsers = Users.map((i: any) => {
        return {
          _id: i._id,
          firstName: i.firstName,
          lastName: i.lastName,
          email: i.email
        }
      })
      res.status(200).json({ getUsers })
    } catch (er) {
      throw new Error(er)
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { _id, firstName, lastName, email } = req.body
      const isCheck = await User.findOne({ _id: _id, email: email })
      if (isCheck) {
        const updateUser = await User.findByIdAndUpdate(_id, {
          $set: {
            firstName, lastName, email
          }
        }, { runValidators: true, new: true })
        res.status(200).json({ updateUser })
      }
      else {
        const isEmail = await User.findOne({ email })
        if (isEmail) return res.status(409).json({ message: 'This email already registed!' })
        const updateUser = await User.findByIdAndUpdate(_id, {
          $set: {
            firstName, lastName, email
          }
        }, { runValidators: true, new: true })
        res.status(200).json({ updateUser })
      }
    } catch (er) {
      throw new Error(er)
    }
  },
  isBan: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      let user: any = await User.findById(id)
      let isBann = true
      if (user.isBann) isBann = false
      user = await User.findByIdAndUpdate(id, {
        $set: {
          isBann
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ user })
    } catch (er) {
      throw new Error(er)
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const isCheck = await User.findById(id)
      if (!isCheck) return res.status(409).json({ message: 'This ID is null' })
      await User.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  }

}
export default userController