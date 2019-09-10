import { takeEvery } from '@redux-saga/core/effects';
import { fetchRepoInfo } from 'actions/app.action';
import { ActionTypes } from './ActionTypes';

export function* mainSaga() {
  yield takeEvery(ActionTypes.FETCH_REPO_INFO_PENDING, fetchRepoInfo);
}
