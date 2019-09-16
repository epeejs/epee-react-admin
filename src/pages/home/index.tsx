import { Button } from 'antd';
import { useStoreActions, useStoreState } from 'hooks';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAsyncFn, useUnmount } from 'react-use';
import styles from './style/Home.module.scss';

interface HomeProps extends RouteComponentProps {
  [key: string]: any;
}

export default function Home(props: HomeProps) {
  const repos = useStoreState(state => state.reposModel.repos);
  const fetchReposInfo = useStoreActions(
    actions => actions.reposModel.fetchReposInfo,
  );
  const reset = useStoreActions(actions => actions.reposModel.reset);
  const [state, fetch] = useAsyncFn(async () => {
    await fetchReposInfo();
  }, []);
  useUnmount(() => reset());

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p>star：{repos ? repos.stargazers_count : '--'}</p>
        <Button type="primary" loading={state.loading} onClick={() => fetch()}>
          获取仓库信息
        </Button>
        <Link to="/login">跳转登录页</Link>
      </header>
    </div>
  );
}
