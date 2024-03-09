import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    return res.status(StatusCodes.OK).json({
      message: 'Get list status'
    })
  })
  .post(boardValidation.createNew, boardController.createNewBoard)

Router.route('/:id').get(boardController.getDetail).put(boardValidation.update, boardController.updateNewBoard)

// --- API hộ trợ kéo thả card giữa các columns khác nhau trong một board
Router.route('/supports/moving-card').put(boardValidation.moveCardsToDifferentColumn, boardController.moveCardsToDifferentColumn)

export const boardRoute = Router
