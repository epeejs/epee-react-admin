import ActionTypes, { ValueDispatch } from 'constants/ActionTypes';
import { IRepo } from 'reducers/app.reducer';
import { getReposInfo } from 'services/app.service';

export const fetchRepoInfo = () => async (
  dispatch: ValueDispatch<Partial<IRepo>>,
) => {
  dispatch({
    type: ActionTypes.FETCH_REPO_INFO_PENDING,
  });

  try {
    const res = await getReposInfo();

    dispatch({
      type: ActionTypes.FETCH_REPO_INFO_OK,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_REPO_INFO_FAIL,
    });
  }
};
