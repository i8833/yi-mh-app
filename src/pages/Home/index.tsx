import React from 'react';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ClockCircleOutlined, NumberOutlined, SelectOutlined, HistoryOutlined } from '@ant-design/icons';
import styles from './Home.module.css';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.mainTitle}>梅花易数</Title>
        <Text className={styles.subtitle}>寂然不动，感而遂通</Text>
      </div>

      <div className={styles.methodsContainer}>
        <Card className={styles.methodCard} style={{ width: 300 }}>
          <div className={styles.methodContent}>
            <div className={styles.methodIconWrapper}>
              <ClockCircleOutlined className={styles.methodIcon} />
            </div>
            <Title level={3} className={styles.methodTitle}>时间起卦</Title>
            <Text className={styles.methodDescription}>
              {/* 根据当前时间生成卦象，体现天时之意 */}
            </Text>
            <Button 
              type="primary" 
              className={styles.startButton}
              onClick={() => navigate('/divination/time')}
            >
              开始
            </Button>
          </div>
        </Card>

        <Card className={styles.methodCard} style={{ width: 300 }}>
          <div className={styles.methodContent}>
            <div className={styles.methodIconWrapper}>
              <NumberOutlined className={styles.methodIcon} />
            </div>
            <Title level={3} className={styles.methodTitle}>三数起卦</Title>
            <Text className={styles.methodDescription}>
              {/* 通过三个数字演算卦象，寓意天地人和 */}
            </Text>
            <Button 
              type="primary" 
              className={styles.startButton}
              onClick={() => navigate('/divination/three-number')}
            >
              开始
            </Button>
          </div>
        </Card>

        <Card className={styles.methodCard} style={{ width: 300 }}>
          <div className={styles.methodContent}>
            <div className={styles.methodIconWrapper}>
              <SelectOutlined className={styles.methodIcon} />
            </div>
            <Title level={3} className={styles.methodTitle}>自选起卦</Title>
            <Text className={styles.methodDescription}>
              {/*手动选择卦象组合，适合专业人士使用*/}
            </Text>
            <Button 
              type="primary" 
              className={styles.startButton}
              onClick={() => navigate('/divination/custom')}
            >
              开始
            </Button>
          </div>
        </Card>
      </div>

      <Divider className={styles.divider}>
        <Text className={styles.dividerText}></Text>
      </Divider>

      <div className={styles.divinationWrapper}>
        <Button 
          type="default"
          icon={<HistoryOutlined />}
          size="large"
          onClick={() => navigate('/divination/history')}
        >
          查看占卜记录
        </Button>
      </div>

      <div className={styles.footer}>
        <Text className={styles.subtitle}>☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷</Text>       
      </div>
    </div>
  );
};

export default Home; 