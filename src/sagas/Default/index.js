import { takeLatest } from 'redux-saga/effects'
import {
  DEFAULT
} from '../../reducers/Default'

export function * getDefaultData ({ data }) {
  try {
    console.log('lol try')
  } catch (err) {
    console.log('lol err', err)
  }
}

function * getDefaultDataSaga () {
  yield takeLatest(DEFAULT, getDefaultData)
}

export const sagas = [
  getDefaultDataSaga
]
