import { Request, Response, NextFunction } from "express"
import { userValidation } from '@/admin/Validations/UserValidation'
export const userValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userValidation.validateAsync(req.body)
  } catch (er) {
    return res.status(400).json({ error: er.details[0].message })
  }
  next()
}