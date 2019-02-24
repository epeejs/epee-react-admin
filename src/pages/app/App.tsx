import { Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { signin } from 'src/actions/app';
import { IReduxState } from 'src/reducer';
import { IAppState, IUser } from 'src/reducer/app';
import styles from './style/App.module.scss';

const mapStateToProps = ({ app: { user } }: IReduxState) => ({
  user
});
const mapDispatchToProps = {
  signin
};

interface AppProps extends IAppState {
  signin: (user: IUser) => void;
}

class App extends React.Component<AppProps> {
  handleClick = () => {
    this.props.signin({ name: '李大海' });
  };

  render() {
    const { user } = this.props;

    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <p>当前登陆用户：{user ? user.name : '--'}</p>
          <Button type="primary" onClick={this.handleClick}>
            改变用户
          </Button>
        </header>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
