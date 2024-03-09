import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newcard = {
      ...reqBody
    }

    const createdCard = await cardModel.createNew(newcard)
    const getNewcard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewcard) {
      getNewcard.cards = []

      await columnModel.pushCardOrderIds(getNewcard)
    }

    return getNewcard
  } catch (error) {
    throw error
  }
}

export const cardService = { createNew }
