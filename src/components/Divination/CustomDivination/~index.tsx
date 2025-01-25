import React, { useState } from 'react';
import { Card, Button, Typography, Space, Divider, Input, Select, message } from 'antd';
import { LeftOutlined, SaveOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { calculateDivination } from '../../../utils/divinationUtils';
import type { DivinationRecord } from '../../../types/divination';
import { GuaMap } from '../../../types/divination';
import styles from './CustomDivination.module.css';
import { useDivinationStore } from '../../../store/divinationStore';
import DivinationResult from '../../Common/DivinationResult';
import { getSymbolsData, Symbol } from '../../../64symbols';
import { SymbolModal } from '../../SymbolModal';

const { Title, Text } = Typography;
const { Option } = Select;

const CustomDivination: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [question, setQuestion] = useState(''); // 所问之事
  const [analysis, setAnalysis] = useState(''); // 断语、分析
  const { setDivinationResult, addDivinationRecord } = useDivinationStore();
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 自选卦象状态
  const [upperGua, setUpperGua] = useState<number>(0);
  const [lowerGua, setLowerGua] = useState<number>(0);
  const [changingLine, setChangingLine] = useState<number>(0);

  const handleDivination = async () => {
    if (!upperGua || !lowerGua || !changingLine) {
      message.warning('请选择完整的卦象信息');
      return;
    }

    try {
      setLoading(true);
      console.log("开始占卜...");
      
      const divinationResult = calculateDivination({
        upperGua,
        lowerGua,
        changingLine
      });
      
      console.log("占卜结果:", divinationResult);
      
      setResult(divinationResult);
      setDivinationResult({
        ...divinationResult,
        method: 'custom',
        customParams: {
          upperGua,
          lowerGua,
          changingLine
        }
      });
    } catch (error) {
      console.error("占卜过程出错:", error);
      message.error('占卜过程出错，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 保存占卜记录
  const handleSave = () => {
    if (!result) {
      message.warning('请先进行起卦');
      return;
    }

    const record: DivinationRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      question: question || '无问题记录',
      analysis: analysis || '无分析记录',
      result: result,
      method: 'custom',
      customParams: {
        upperGua,
        lowerGua,
        changingLine
      }
    };

    try {
      addDivinationRecord(record);
      message.success({
        content: '占卜记录已保存',
        duration: 2,
        style: {
          marginTop: '20vh',
        },
      });
      setQuestion('');
      setAnalysis('');
    } catch (error) {
      message.error({
        content: '保存记录失败，请重试',
        duration: 2,
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  // 查看历史记录
  const handleViewHistory = () => {
    navigate('/divination/history');
  };

  // 添加处理卦象点击的函数
  const handleSymbolClick = (name: string) => {
    console.log('Clicking symbol:', name);
    const symbols = getSymbolsData();
    const symbol = symbols.find(s => s.name === name);
    console.log('Found symbol:', symbol);
    
    if (symbol) {
      setSelectedSymbol(symbol);
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          
          <Title level={2} className={styles.title}>自选起卦</Title>
          
        </div>

        <Space direction="vertical" size="large" className={styles.content}>
          {/* 卦象选择区域 */}
          <div className={styles.selectGroup}>
            <div className={styles.selectItem}>
              <Text>上卦：</Text>
              <Select
                value={upperGua || undefined}
                onChange={setUpperGua}
                placeholder="请选择上卦"
                className={styles.select}
              >
                {Object.entries(GuaMap).map(([num, name]) => (
                  <Option key={num} value={Number(num)}>
                    {name} ({num})
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.selectItem}>
              <Text>下卦：</Text>
              <Select
                value={lowerGua || undefined}
                onChange={setLowerGua}
                placeholder="请选择下卦"
                className={styles.select}
              >
                {Object.entries(GuaMap).map(([num, name]) => (
                  <Option key={num} value={Number(num)}>
                    {name} ({num})
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.selectItem}>
              <Text>动爻：</Text>
              <Select
                value={changingLine || undefined}
                onChange={setChangingLine}
                placeholder="请选择动爻"
                className={styles.select}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <Option key={num} value={num}>
                    第 {num} 爻
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {/* 所问之事输入区域 */}
          <div className={styles.questionSection}>
            <Text strong>所问之事（选填）：</Text>
            <Input.TextArea 
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="可以输入您想问卜的事情..."
              className={styles.textarea}
            />
          </div>
          
          <Button 
            type="primary" 
            size="large" 
            onClick={handleDivination}
            loading={loading}
            className={styles.divinationButton}
          >
            {loading ? '占卜中...' : '立即起卦'}
          </Button>

          {result && (
            <>
              <Divider />
              <div className={styles.resultSection}>
                <DivinationResult 
                  result={result}
                  analysis={analysis}
                  onSymbolClick={handleSymbolClick}
                />
              </div>
            </>
          )}

          {result && (
            <div className={styles.analysisSection}>
              <Text strong>断语、分析（选填）：</Text>
              <Input.TextArea 
                rows={4}
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder="可以输入您对卦象的分析..."
                className={styles.textarea}
              />
            </div>
          )}

          {/* 保存按钮 */}
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            className={styles.saveButton}
          >
            保存记录
          </Button>
        </Space>

        {/* 添加模态框组件 */}
        <SymbolModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          symbol={selectedSymbol}
        />
      </Card>

      <Button 
          type="link" 
          icon={<LeftOutlined style={{ color: '#666' }} />} 
          onClick={() => navigate('/')}
          
        >
          返回首页
        </Button>
        
    </div>
  );
};

export default CustomDivination; 
