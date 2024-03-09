import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNewcolumn = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body)

    return res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)
  }
}

export const columnController = { createNewcolumn }