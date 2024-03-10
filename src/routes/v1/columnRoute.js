import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'

const Router = express.Router()

Router.route('/').post(columnValidation.createNew, columnController.createNewcolumn)

Router.route('/:id').put(columnValidation.update, columnController.updateNewColumn).delete(columnValidation.deleteItem, columnController.deleteItem)

export const columnRoute = Router
