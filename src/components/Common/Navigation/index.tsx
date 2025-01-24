import React from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navigation}>
      <Button 
        type="link" 
        icon={<HomeOutlined />}
        onClick={() => navigate('/')}
        className={styles.homeButton}
      >
        返回首页
      </Button>
    </div>
  );
};

export default Navigation; 