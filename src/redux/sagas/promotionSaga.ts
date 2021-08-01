import { AnyAction } from 'redux'
import {
  put,
  call,
  takeLatest,
  takeEvery,
  ForkEffect
} from 'redux-saga/effects'

// Import all actions and api's
import {
  SET_LOADING,
  GET_PROMOTIONS,
  GET_PROMOTIONS_REQUESTED,
  CLEAR_PROMOTION_TITLE,
  CREATE_PROMOTION,
  CREATE_PROMOTION_REQUESTED,
  DELETE_PROMOTION,
  DELETE_PROMOTION_REQUESTED
} from '../actions/promotionAction'

import {
  getAllPromotions,
  createNewPromotion,
  deleteExistedPromotion
} from '../api/promotionApi'


function* getPromotions() {
  yield put({ type: SET_LOADING })

  const promotions: Promotion[] = yield call(getAllPromotions)

  yield put({ type: GET_PROMOTIONS, payload: promotions })
}

function* createPromotion(payload: AnyAction) {
  yield put({ type: SET_LOADING })

  const newPromotion: Promotion = yield call(createNewPromotion, payload.payload)

  yield put({ type: CREATE_PROMOTION, payload: newPromotion })

  yield put({ type: CLEAR_PROMOTION_TITLE })
}

function* deletePromotion(payload: AnyAction) {
  yield put({ type: SET_LOADING })
  const promotions: Promotion = yield call(deleteExistedPromotion, payload.payload)

  yield put({ type: DELETE_PROMOTION, payload: promotions })
}

function* promotionSaga():Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(GET_PROMOTIONS_REQUESTED, getPromotions)
  yield takeLatest(CREATE_PROMOTION_REQUESTED, createPromotion)
  yield takeEvery(DELETE_PROMOTION_REQUESTED, deletePromotion)
}
export default promotionSaga