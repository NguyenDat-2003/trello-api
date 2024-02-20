import { boardModel } from '~/models/boardModel';
import slugify from '~/utils/slugify';

/* eslint-disable no-empty */
const createNew = async (reqBody) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        };

        //--- Gọi tới tầng Model để xử lý, lưu bản ghi vào trong database
        const createdBoard = await boardModel.createNew(newBoard);

        const getNewBoard = await boardModel.findOneById(
            createdBoard.insertedId
        );

        //--- Trả kết quả về cho Controller, trong Service phải luôn có return
        return getNewBoard;
    } catch (error) {
        throw error;
    }
};

export const boardService = { createNew };
