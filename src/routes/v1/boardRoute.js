import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

const Router = express.Router();

Router.route('/')
    .get((req, res) => {
        return res.status(StatusCodes.OK).json({
            message: 'Get list status',
        });
    })
    .post(boardValidation.createNew, boardController.createNewBoard);

export const boardRoute = Router;
