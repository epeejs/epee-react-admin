import { Button } from 'antd';
import { useStoreActions, useStoreState } from 'hooks';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useAsyncFn } from 'react-use';
import styles from './style/App.module.scss';

interface AppProps extends RouteComponentProps {
  [key: string]: any;
}

export default function App(props: AppProps) {
  const repos = useStoreState(state => state.appModel.repos);
  const fetchReposInfo = useStoreActions(
    actions => actions.appModel.fetchReposInfo,
  );

  const [state, fetch] = useAsyncFn(async () => {
    await fetchReposInfo();
  }, []);

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p>star：{repos ? repos.stargazers_count : '--'}</p>
        <Button type="primary" loading={state.loading} onClick={() => fetch()}>
          获取仓库信息
        </Button>
      </header>
    </div>
  );
}
