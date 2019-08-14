import { fetchRepoInfo } from 'actions/app.action';
import { Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxState } from 'reducer';
import { IAppState, IRepo } from 'reducer/app.reducer';
import styles from './style/App.module.scss';

const mapStateToProps = ({ app: { repo } }: IReduxState) => ({
  repo,
});
const mapDispatchToProps = {
  fetchRepoInfo,
};

interface AppProps extends IAppState {
  repo: IResponseNotPage<IRepo>;
  fetchRepoInfo: () => void;
}

class App extends React.Component<AppProps> {
  handleClick = () => {
    this.props.fetchRepoInfo();
  };

  render() {
    const {
      repo: { data, loading },
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <p>star：{data ? data.stargazers_count : '--'}</p>
          <Button type="primary" loading={loading} onClick={this.handleClick}>
            获取仓库信息
          </Button>
        </header>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
