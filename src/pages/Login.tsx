import { Button, Checkbox, Form, Icon, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMount } from 'react-use';
import styles from './Login.module.scss';

interface LoginProps extends RouteComponentProps, FormComponentProps {
  [key: string]: any;
}

function Login({ form, history }: LoginProps) {
  const { getFieldDecorator } = form;

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
        onSubmit={e => {
          e.preventDefault();
          form.validateFields((err: any, values: any) => {
            if (!err) {
              // eslint-disable-next-line no-console
              console.log('Received values of form: ', values);
            }
          });
        }}
      >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
        </Form.Item>

        <div className={styles.footer}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => history.replace('/')}
          >
            Log in
          </Button>
          <Button type="primary" onClick={() => history.goBack()}>
            后退
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Form.create<LoginProps>()(Login);
