import React, { useState } from 'react';
import { Card, Button, Typography, Space, Divider, Input, InputNumber, message } from 'antd';
import { LeftOutlined, SaveOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { calculateThreeNumberDivination } from '../../../utils/threeNumberDivinationUtils';
import type { DivinationRecord, ThreeNumberParams } from '../../../types/divination';
import styles from './ThreeNumberDivination.module.css';
import { useDivinationStore } from '../../../store/divinationStore';
import DivinationResult from '../../Common/DivinationResult';
import { getSymbolsData, Symbol } from '../../../64symbols';
import { SymbolModal } from '../../SymbolModal';

const { Title, Text } = Typography;

const ThreeNumberDivination: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [question, setQuestion] = useState(''); // 所问之事
  const [analysis, setAnalysis] = useState(''); // 断语、分析
  const { setDivinationResult, addDivinationRecord } = useDivinationStore();
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 三个数字的状态
  const [numbers, setNumbers] = useState<ThreeNumberParams>({
    num1: 0,
    num2: 0,
    num3: 0
  });

  const handleNumberChange = (key: keyof ThreeNumberParams, value: number | null) => {
    setNumbers(prev => ({
      ...prev,
      [key]: value || 0
    }));
  };

  const handleDivination = async () => {
    if (!numbers.num1 || !numbers.num2 || !numbers.num3) {
      message.warning('请输入三个数字');
      return;
    }

    try {
      setLoading(true);
      console.log("开始占卜...");
      
      const divinationResult = calculateThreeNumberDivination(numbers);
      console.log("占卜结果:", divinationResult);
      
      setResult(divinationResult);
      setDivinationResult(divinationResult);
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
      method: 'threeNumber',
      numbers: numbers
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
          <Button 
            type="link" 
            icon={<LeftOutlined />} 
            onClick={() => navigate('/')}
            className={styles.backButton}
          >
            返回首页
          </Button>
          <Title level={2} className={styles.title}>三数起卦</Title>
          <Button
            type="link"
            icon={<HistoryOutlined />}
            onClick={handleViewHistory}
            className={styles.historyButton}
          >
            查看记录
          </Button>
        </div>

        <Space direction="vertical" size="large" className={styles.content}>
          {/* 数字输入区域 */}
          <div className={styles.inputGroup}>
            <div className={styles.inputItem}>
              <Text>第一个数字：</Text>
              <InputNumber
                min={1}
                max={999}
                value={numbers.num1}
                onChange={(value) => handleNumberChange('num1', value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputItem}>
              <Text>第二个数字：</Text>
              <InputNumber
                min={1}
                max={999}
                value={numbers.num2}
                onChange={(value) => handleNumberChange('num2', value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputItem}>
              <Text>第三个数字：</Text>
              <InputNumber
                min={1}
                max={999}
                value={numbers.num3}
                onChange={(value) => handleNumberChange('num3', value)}
                className={styles.input}
              />
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
            </>
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
    </div>
  );
};

export default ThreeNumberDivination; 