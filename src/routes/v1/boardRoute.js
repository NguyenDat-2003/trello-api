import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '~/validations/boardValidation';

const Router = express.Router();

Router.route('/')
    .get((req, res) => {
        return res.status(StatusCodes.OK).json({
            message: 'Get list status',
        });
    })
    .post(boardValidation.createNew);

export const boardRoute = Router;
