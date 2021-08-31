import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle="对不起，你访问的页面不存在"
    extra={
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    }
  />
);
