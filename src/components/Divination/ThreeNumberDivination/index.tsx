import React, { useState } from 'react';
import { Button, Typography, Input, InputNumber, message, Card, Space } from 'antd';
import { LeftOutlined, SaveOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { calculateThreeNumberDivination } from '../../../utils/threeNumberDivinationUtils';
import type { DivinationRecord, ThreeNumberParams, IDivinationResult } from '../../../types/divination';
import styles from './ThreeNumberDivination.module.css';
import { useDivinationStore } from '../../../store/divinationStore';
import DivinationResultComponent from '../../Common/DivinationResult';
import { getSymbolsData, Symbol } from '../../../64symbols';
import { SymbolModal } from '../../SymbolModal';

const { Title, Text } = Typography;

const ThreeNumberDivination: React.FC = () => {
  console.log('ThreeNumberDivination component rendered');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IDivinationResult | null>(null);
  const [question, setQuestion] = useState('');
  const [analysis, setAnalysis] = useState('');
  const { setDivinationResult, addDivinationRecord } = useDivinationStore();
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const calculatedResult = calculateThreeNumberDivination(numbers);
      
      const divinationResult: IDivinationResult = {
        mainGua: {
          ...calculatedResult.mainGua,
          changingLine: calculatedResult.mainGua.changingLine || 1
        },
        huGua: calculatedResult.huGua,
        bianGua: calculatedResult.bianGua,
        cuoGua: calculatedResult.cuoGua,
        zongGua: calculatedResult.zongGua,
        timestamp: new Date().toISOString(),
        hexagram: {
          name: calculatedResult.mainGua.name,
          symbol: calculatedResult.mainGua.symbol,
          upperTrigram: {
            name: calculatedResult.mainGua.upperGua,
            symbol: ''
          },
          lowerTrigram: {
            name: calculatedResult.mainGua.lowerGua,
            symbol: ''
          },
          changingLine: calculatedResult.mainGua.changingLine || 1,
          meaning: ''
        }
      };
      
      setResult(divinationResult);
      setDivinationResult(divinationResult);
    } catch (error) {
      console.error("占卦过程出错:", error);
      message.error('占卦过程出错，请重试');
    } finally {
      setLoading(false);
    }
  };

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
      message.success('占卦记录已保存');
    } catch (error) {
      message.error('保存记录失败，请重试');
    }
  };

  const handleViewHistory = () => {
    navigate('/divination/history');
  };

  const handleSymbolClick = (name: string) => {
    const symbols = getSymbolsData();
    const symbol = symbols.find(s => s.name === name);
    if (symbol) {
      setSelectedSymbol(symbol);
      setIsModalOpen(true);
    }
  };

  return (
    <div style={{ 
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      backgroundColor: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      overflowY: 'auto',
      zIndex: 1000
    }}>
      <Card style={{ 
        width: '100%',
        minHeight: '100%',
        margin: 0,
        padding: '0.5rem',
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none'
      }}>
        <div className={styles.header} style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#fff',
          zIndex: 10,
          padding: '1rem 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Title level={2} style={{
            margin: 0,
            fontSize: '1.2rem',
            lineHeight: '1.5',
            padding: 0
          }}>三数起卦</Title>
        </div>

        <Space direction="vertical" size="large" style={{
          width: '100%',
          padding: '0.5rem',
          marginTop: '1rem'
        }}>
          <div style={{
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <div className={styles.inputGrid}>
              <div className={styles.inputItem}>
                <Text className={styles.label}>第一个数字</Text>
                <InputNumber
                  min={1}
                  max={999}
                  value={numbers.num1}
                  onChange={(value) => handleNumberChange('num1', value)}
                  className={styles.input}
                  placeholder="请输入"
                />
              </div>
              <div className={styles.inputItem}>
                <Text className={styles.label}>第二个数字</Text>
                <InputNumber
                  min={1}
                  max={999}
                  value={numbers.num2}
                  onChange={(value) => handleNumberChange('num2', value)}
                  className={styles.input}
                  placeholder="请输入"
                />
              </div>
              <div className={styles.inputItem}>
                <Text className={styles.label}>第三个数字</Text>
                <InputNumber
                  min={1}
                  max={999}
                  value={numbers.num3}
                  onChange={(value) => handleNumberChange('num3', value)}
                  className={styles.input}
                  placeholder="请输入"
                />
              </div>
            </div>
          </div>

          <div style={{
            width: '100%',
            padding: '0 0.5rem'
          }}>
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
            style={{
              width: '100%',
              height: '44px',
              margin: '1rem 0'
            }}
          >
            {loading ? '占卜中...' : '立即起卦'}
          </Button>

          {result && (
            <>
              <div style={{
                width: '100%',
                padding: '0 0.5rem'
              }}>
                <DivinationResultComponent 
                  result={result}
                  analysis={analysis}
                  onSymbolClick={handleSymbolClick}
                />
              </div>

              <div style={{
                width: '100%',
                padding: '0 0.5rem'
              }}>
                <Text strong>断语、分析（选填）：</Text>
                <Input.TextArea 
                  rows={4}
                  value={analysis}
                  onChange={(e) => setAnalysis(e.target.value)}
                  placeholder="可以输入您对卦象的分析..."
                  className={styles.textarea}
                />
              </div>

              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                style={{
                  width: '100%',
                  height: '44px',
                  margin: '1rem 0'
                }}
              >
                保存记录
              </Button>
            </>
          )}

          <Button 
            type="link" 
            icon={<LeftOutlined />} 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              height: '44px',
              color: '#666',
              marginTop: '1rem',
              marginBottom: '2rem'
            }}
          >
            返回首页
          </Button>
        </Space>
      </Card>

      <SymbolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        symbol={selectedSymbol}
      />
    </div>
  );
};

export default ThreeNumberDivination; 