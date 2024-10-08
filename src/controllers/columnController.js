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

const updateNewColumn = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const updatedColumn = await columnService.update(columnId, req.body)

    return res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) {
    next(error)
  }
}
const deleteItem = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const result = await columnService.deleteItem(columnId)

    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const columnController = { createNewcolumn, updateNewColumn, deleteItem }
