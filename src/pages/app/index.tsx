import { Button } from 'antd';
import { ActionTypes, ValueDispatch } from 'constants/ActionTypes';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ReduxState } from 'reducers';
import styles from './style/App.module.scss';

interface AppProps extends RouteComponentProps {
  [key: string]: any;
}

export default function App(props: AppProps) {
  const { data, loading } = useSelector(
    (state: ReduxState) => state.appReducer.repo,
  );
  const dispatch: ValueDispatch = useDispatch();

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p>star：{data ? data.stargazers_count : '--'}</p>
        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            dispatch({
              type: ActionTypes.FETCH_REPO_INFO_PENDING,
            });
          }}
        >
          获取仓库信息
        </Button>
      </header>
    </div>
  );
}
