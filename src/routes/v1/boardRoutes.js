import express from 'express';
import { StatusCodes } from 'http-status-codes';

const Router = express.Router();

Router.route('/')
    .get((req, res) => {
        return res.status(StatusCodes.OK).json({
            message: 'Get list status',
        });
    })
    .post((req, res) => {
        return res.status(StatusCodes.CREATED).json({
            message: 'Create new status',
        });
    });

export const boardRoutes = Router;
