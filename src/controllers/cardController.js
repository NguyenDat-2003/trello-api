import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNewcard = async (req, res, next) => {
  try {
    const createdCard = await cardService.createNew(req.body)

    return res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
  }
}

export const cardController = { createNewcard }
