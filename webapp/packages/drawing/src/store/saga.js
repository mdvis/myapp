/**
 * name: saga.js
 * author: Deve
 * date: 2021-04-13
 */

import { takeEvery, put } from 'redux-saga/effects';

function* saga1(){
    yield put({ type: 'SHOW_MORE', payload: 666 })
}

function* saga(){
    yield takeEvery('SHOW_MORE_HOME', saga1)
}

export default saga;
