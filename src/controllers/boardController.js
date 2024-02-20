import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';

const createNewBoard = async (req, res, next) => {
    try {
        //--- Điều hướng dữ liệu sang tầng Service để xử lý
        const createdBoard = await boardService.createNew(req.body);

        return res.status(StatusCodes.CREATED).json(createdBoard);
    } catch (error) {
        next(error);
    }
};

export const boardController = { createNewBoard };
