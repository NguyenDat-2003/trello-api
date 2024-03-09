import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'

const Router = express.Router()

Router.route('/').post(cardValidation.createNew, cardController.createNewcard)

export const cardRoute = Router
