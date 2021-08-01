import { readFromLocalStorage, writeToLocalStorage } from './storageService'
import _ from 'lodash'

export const getAllPromotions = async (): Promise<Promotion[]> => {
  return new Promise((resolve) => {
    return resolve(readFromLocalStorage())
  })
}

export const createNewPromotion = (promotion: Promotion): Promise<Promotion[]> => {
  return new Promise((resolve) => {
    let promotions = readFromLocalStorage()
    promotions = [...promotions, promotion]
    writeToLocalStorage(promotions)
    return resolve(promotions)
  })
}

export const deleteExistedPromotion = async (payload: Promotion): Promise<Promotion[]> => {
  return new Promise((resolve) => {
    const promotions = readFromLocalStorage()
    _.remove(promotions, (x: Promotion) => x.id == payload.id)
    writeToLocalStorage(promotions)
    return resolve(promotions)
  }
  )
}