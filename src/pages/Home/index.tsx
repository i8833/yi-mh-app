import React from 'react';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ClockCircleOutlined, NumberOutlined, SelectOutlined, HistoryOutlined } from '@ant-design/icons';
import styles from './Home.module.css';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container} style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      backgroundColor: '#f5f5f5'
    }}>
      <div className={styles.header} style={{ 
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px'
      }}>
        <Title level={2} style={{ 
          fontSize: '1.8rem',
          marginBottom: '0.5rem',
          color: '#1890ff'
        }}>
          梅花易数
        </Title>
        <Text style={{ 
          fontSize: '1rem',
          color: '#666'
        }}>
          寂然不动，感而遂通
        </Text>
      </div>

      <div className={styles.methodsContainer} style={{ 
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2rem',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <Card className={styles.methodCard} style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          width: '280px',
          ':hover': {
            transform: 'translateY(-4px)'
          }
        }}>
          <div className={styles.methodContent} style={{ 
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ 
              marginBottom: '1rem',
              fontSize: '2.5rem',
              color: '#1890ff'
            }}>
              <ClockCircleOutlined />
            </div>
            <Title level={3} style={{ 
              fontSize: '1.3rem',
              marginBottom: '0.5rem'
            }}>
              时间起卦
            </Title>
            
            <Button 
              type="primary" 
              style={{ 
                width: '100%',
                height: '40px',
                borderRadius: '8px'
              }}
              onClick={() => navigate('/divination/time')}
            >
              开始
            </Button>
          </div>
        </Card>

        <Card className={styles.methodCard} style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          width: '280px',
          ':hover': {
            transform: 'translateY(-4px)'
          }
        }}>
          <div className={styles.methodContent} style={{ 
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ 
              marginBottom: '1rem',
              fontSize: '2.5rem',
              color: '#1890ff'
            }}>
              <NumberOutlined />
            </div>
            <Title level={3} style={{ 
              fontSize: '1.3rem',
              marginBottom: '0.5rem'
            }}>
              三数起卦
            </Title>
            
            <Button 
              type="primary" 
              style={{ 
                width: '100%',
                height: '40px',
                borderRadius: '8px'
              }}
              onClick={() => navigate('/divination/number')}
            >
              开始
            </Button>
          </div>
        </Card>

        <Card className={styles.methodCard} style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          width: '280px',
          ':hover': {
            transform: 'translateY(-4px)'
          }
        }}>
          <div className={styles.methodContent} style={{ 
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ 
              marginBottom: '1rem',
              fontSize: '2.5rem',
              color: '#1890ff'
            }}>
              <SelectOutlined />
            </div>
            <Title level={3} style={{ 
              fontSize: '1.3rem',
              marginBottom: '0.5rem'
            }}>
              自选起卦
            </Title>
           
            <Button 
              type="primary" 
              style={{ 
                width: '100%',
                height: '40px',
                borderRadius: '8px'
              }}
              onClick={() => navigate('/divination/custom')}
            >
              开始
            </Button>
          </div>
        </Card>
      </div>

      <Divider className={styles.divider} style={{ margin: '1.5rem 0' }}>
        <Text className={styles.dividerText}></Text>
      </Divider>

      <div style={{ 
        padding: '1rem',
        backgroundColor: 'transparent',
        width: '100%',
        maxWidth: '600px'
      }}>
        <Button 
          type="default"
          icon={<HistoryOutlined />}
          size="large"
          style={{ 
            width: '100%',
            height: '48px',
            borderRadius: '8px',
            fontSize: '1rem',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          onClick={() => navigate('/divination/history')}
        >
          查看占卦记录
        </Button>
      </div>

      <div style={{ 
        textAlign: 'center',
        marginTop: '2rem',
        padding: '1rem',
        color: '#666',
        fontSize: '0.9rem',
        width: '100%',
        maxWidth: '600px'
      }}>
        <Text style={{ fontSize: '1.1rem' }}>☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷</Text>
        
      </div>
    </div>
  );
};

export default Home; 