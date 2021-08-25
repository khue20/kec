import { Request, Response, NextFunction } from 'express'
import { eventValidator } from '../Validations/eventValidation'

export const eventValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await eventValidator.validateAsync(req.body)
  } catch (err) {
    return res.status(400).json({ error: err.details[0].message })
  }
  next()
}