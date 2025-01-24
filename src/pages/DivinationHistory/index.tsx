import React from 'react';
import { Card, List, Typography, Button, Space, Tag, Divider, Popconfirm, message } from 'antd';
import { LeftOutlined, ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDivinationStore } from '../../store/divinationStore';
import styles from './DivinationHistory.module.css';

const { Title, Text, Paragraph } = Typography;

const DivinationHistory: React.FC = () => {
  const navigate = useNavigate();
  const { records, deleteRecord } = useDivinationStore();

  const getMethodText = (method?: string) => {
    switch (method) {
      case 'time':
        return '时间起卦';
      case 'threeNumber':
        return '三数起卦';
      case 'custom':
        return '自选起卦';
      default:
        return '未知方式';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // 删除单条记录
  const handleDelete = (id: string) => {
    deleteRecord(id);
    message.success('记录已删除');
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <Button 
            type="link" 
            icon={<LeftOutlined />} 
            onClick={() => navigate(-1)}
            className={styles.backButton}
          >
            返回
          </Button>
          <Title level={2} className={styles.title}>占卜记录</Title>
        </div>

        {records.length === 0 ? (
          <div className={styles.emptyText}>
            暂无占卜记录
          </div>
        ) : (
          <List
            dataSource={records}
            renderItem={record => (
              <List.Item className={styles.recordItem}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div className={styles.recordHeader}>
                    <Space>
                      <ClockCircleOutlined />
                      <Text strong>{formatDate(record.timestamp)}</Text>
                      <Tag color="blue">{getMethodText(record.method)}</Tag>
                    </Space>
                    <Popconfirm
                      title="确定要删除这条记录吗？"
                      onConfirm={() => handleDelete(record.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />}
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  </div>
                  <div className={styles.recordContent}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Text>所问之事：{record.question || '无'}</Text>
                      
                      <div className={styles.guaResultSection}>
                        <div className={styles.mainGuaRow}>
                          <div className={styles.guaItem}>
                            <div className={styles.guaName}>
                              本卦：{record.result.mainGua.name} {record.result.mainGua.symbol}
                            </div>
                            <div className={styles.guaDetails}>
                              上卦：{record.result.mainGua.upperGua}
                              <br />
                              下卦：{record.result.mainGua.lowerGua}
                              <br />
                              动爻：第 {record.result.mainGua.changingLine} 爻
                            </div>
                          </div>
                          
                          <div className={styles.guaItem}>
                            <div className={styles.guaName}>
                              互卦：{record.result.huGua.name} {record.result.huGua.symbol}
                            </div>
                          </div>
                          
                          <div className={styles.guaItem}>
                            <div className={styles.guaName}>
                              变卦：{record.result.bianGua.name} {record.result.bianGua.symbol}
                            </div>
                          </div>
                        </div>
                        
                        <div className={styles.secondaryGuaRow}>
                          <div className={styles.guaItem}>
                            <div className={styles.guaName}>
                              错卦：{record.result.cuoGua.name} {record.result.cuoGua.symbol}
                            </div>
                          </div>
                          
                          <div className={styles.guaItem}>
                            <div className={styles.guaName}>
                              综卦：{record.result.zongGua.name} {record.result.zongGua.symbol}
                            </div>
                          </div>
                        </div>
                      </div>

                      {record.analysis && (
                        <div className={styles.analysisSection}>
                          <Text strong>分析：</Text>
                          <Paragraph style={{ marginTop: 8 }}>{record.analysis}</Paragraph>
                        </div>
                      )}
                    </Space>
                  </div>
                </Space>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default DivinationHistory; 