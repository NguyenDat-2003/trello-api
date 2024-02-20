import slugify from '~/utils/slugify';

/* eslint-disable no-empty */
const createNew = async (reqBody) => {
    try {
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        };

        //--- Gọi tới tầng Model để xử lý, lưu bản ghi vào trong database

        //--- Trả kết quả về cho Controller, trong Service phải luôn có return
        return newBoard;
    } catch (error) {}
};

export const boardService = { createNew };
