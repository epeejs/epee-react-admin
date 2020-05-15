import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMount } from 'react-use';
import styles from './Login.module.scss';

interface LoginProps extends RouteComponentProps {
  [key: string]: any;
}

const Login: React.FC<LoginProps> = ({ history }) => {
  useMount(() => {
    const code = sessionStorage.getItem('code');

    if (code === '401') {
      message.error('身份信息已过期或权限不足，请重新登录！');
      sessionStorage.clear();
    }
  });

  return (
    <div className={styles.wrap}>
      <Form
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={values => {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values);
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className={styles.form_item_icon} />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className={styles.form_item_icon} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a href="/login">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            onClick={() => history.replace('/')}
          >
            Log in
          </Button>
          Or <a href="/login">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
