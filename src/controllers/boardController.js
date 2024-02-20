import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';

const createNewBoard = async (req, res, next) => {
    try {
        //--- Điều hướng dữ liệu sang tầng Service để xử lý
        const createdBoard = await boardService.createNew(req.body);

        //--- Có kết quả thì trả về cho client
        return res.status(StatusCodes.CREATED).json(createdBoard);
    } catch (error) {
        next(error);
    }
};

const getDetail = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const board = await boardService.getDetail(boardId);

        return res.status(StatusCodes.OK).json(board);
    } catch (error) {
        next(error);
    }
};

export const boardController = { createNewBoard, getDetail };
