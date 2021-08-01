import {
  spawn,
  ForkEffect
} from 'redux-saga/effects'
import promotionSaga from './promotionSaga'

function* rootSaga(): Generator<ForkEffect<void>, void, unknown> {
  yield spawn(promotionSaga)
}

export default rootSaga;