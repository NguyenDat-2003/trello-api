import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict(),
        description: Joi.string().required().min(3).max(256).trim().strict(),
    });

    try {
        //---Chỉ định abortEarly: false để khi có nhiều lỗi thì trả về tất cả lỗi
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message,
        });
    }
};

export const boardValidation = { createNew };