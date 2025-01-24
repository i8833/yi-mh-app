import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate, isRouteErrorResponse, useRouteError } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <div style={{ padding: '50px', textAlign: 'center' }}>
          加载中...
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
};

export const ErrorElement: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Result
        status={error.status}
        title={error.status}
        subTitle={error.statusText || "页面出错了"}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return (
    <Result
      status="error"
      title="出错了"
      subTitle="抱歉，发生了一些错误"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          返回首页
        </Button>
      }
    />
  );
};

export default ErrorBoundary; 