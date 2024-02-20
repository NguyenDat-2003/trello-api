import { StatusCodes } from 'http-status-codes';

const createNewBoard = async (req, res, next) => {
    try {
        return res.status(StatusCodes.CREATED).json({
            message: 'Controller Create new status',
        });
    } catch (error) {
        next(error);
    }
};

export const boardController = { createNewBoard };
