import { call, put } from '@redux-saga/core/effects';
import { ActionTypes, ValueAction } from 'constants/ActionTypes';
import { Repo } from 'reducers/app.reducer';
import { getReposInfo } from 'services/app.service';

export function* fetchRepoInfo(action: ValueAction) {
  try {
    const res: Repo = yield call(getReposInfo);
    yield put({ type: ActionTypes.FETCH_REPO_INFO_OK, payload: res });
  } catch (e) {
    yield put({ type: ActionTypes.FETCH_REPO_INFO_FAIL });
  }
}
