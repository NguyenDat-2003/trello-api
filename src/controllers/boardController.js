import { StatusCodes } from 'http-status-codes';

const createNewBoard = async (req, res, next) => {
    try {
        // eslint-disable-next-line no-console
        console.log(req.body);
        return res.status(StatusCodes.CREATED).json({
            message: 'Controller Create new status',
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: error.message,
        });
    }
};

export const boardController = { createNewBoard };
