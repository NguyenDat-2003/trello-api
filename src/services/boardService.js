import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import slugify from '~/utils/slugify'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

/* eslint-disable no-empty */
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //--- Gọi tới tầng Model để xử lý, lưu bản ghi vào trong database
    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    //--- Trả kết quả về cho Controller, trong Service phải luôn có return
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetail = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetail(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    // ---B1: Deep clone ra board mới ko ảnh hưởng đến board ban đầu
    const resBoard = cloneDeep(board)

    // ---B2: Đưa cards về đúng column của nó
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter((card) => card.columnId.toString() === column._id.toString())
    })

    // ---B3: Xóa mảng cards khỏi board ban đầu
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    return updatedBoard
  } catch (error) {
    throw error
  }
}

const moveCardsToDifferentColumn = async (reqBody) => {
  try {
    // * B1: Cập nhật mảng cardOrderIds của Column ban đầu (Nghĩa là xóa cái _id của Card ra khỏi column ban đầu)
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    // * B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Nghĩa là thêm cái _id của Card vào column mới)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    // * B3: Cập nhật lại trường columnId mới của card đã kéo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })
    return { updateResult: 'Successfully!' }
  } catch (error) {
    throw error
  }
}

export const boardService = { createNew, getDetail, update, moveCardsToDifferentColumn }
