import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from './boardRoutes';

const Router = express.Router();

Router.get('/test', (req, res) => {
    return res.status(StatusCodes.OK).json({
        message: 'Test status',
    });
});

Router.use('/boards', boardRoutes);

export const APIs_V1 = Router;
