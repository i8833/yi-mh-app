import React from 'react';
import { Spin } from 'antd';
import styles from './Loading.module.css';

interface LoadingProps {
  tip?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  tip = '加载中...', 
  fullScreen = false 
}) => {
  const className = fullScreen ? styles.fullScreen : styles.container;

  return (
    <div className={className}>
      <Spin tip={tip} size="large" />
    </div>
  );
};

export default Loading; 