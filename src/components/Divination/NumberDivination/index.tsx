import React, { useState } from 'react';
import { Card, Button, Typography, Space, Input, message } from 'antd';
import { LeftOutlined, SaveOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './NumberDivination.module.css';
import { useDivinationStore } from '../../../store/divinationStore';
import { calculateDivination } from '../../../utils/divinationUtils';
import guaData from '../../../gua64.json';
import DivinationResult from '../../Common/DivinationResult';
import { getSymbolsData } from '../../../64symbols';
import { SymbolModal } from '../../SymbolModal';

const { Title, Text } = Typography;

const NumberDivination: React.FC = () => {
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [question, setQuestion] = useState('');
  const [analysis, setAnalysis] = useState('');
  const { setDivinationResult, addDivinationRecord } = useDivinationStore();
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 处理数字输入
  const handleNumberChange = (index: number, value: string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    const newNumbers = [...numbers];
    newNumbers[index] = newValue;
    setNumbers(newNumbers);
  };

  // 处理起卦
  const handleDivination = async () => {
    if (numbers.some(n => !n)) {
      message.warning('请输入三个数字');
      return;
    }

    try {
      setLoading(true);
      console.log("开始占卜...");

      // 计算卦数
      const num1 = parseInt(numbers[0]);
      const num2 = parseInt(numbers[1]);
      const num3 = parseInt(numbers[2]);

      let upperGua = (num1 + num2) % 8;
      let lowerGua = (num2 + num3) % 8;
      let changingLine = (num1 + num2 + num3) % 6;

      // 处理余数为0的情况
      upperGua = upperGua === 0 ? 8 : upperGua;
      lowerGua = lowerGua === 0 ? 8 : lowerGua;
      changingLine = changingLine === 0 ? 6 : changingLine;

      console.log('卦数计算结果：', { upperGua, lowerGua, changingLine });

      // 计算卦象
      const divinationResult = calculateDivination({
        upperGua,
        lowerGua,
        changingLine
      });

      // 查找对应的卦象
      const mainHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.mainGua.upperGua && 
               hex.lowerGua === divinationResult.mainGua.lowerGua
      );

      const huHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.huGua.upperGua && 
               hex.lowerGua === divinationResult.huGua.lowerGua
      );

      const bianHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.bianGua.upperGua && 
               hex.lowerGua === divinationResult.bianGua.lowerGua
      );

      const cuoHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.cuoGua.upperGua && 
               hex.lowerGua === divinationResult.cuoGua.lowerGua
      );

      const zongHexagram = guaData.hexagrams.find(
        hex => hex.upperGua === divinationResult.zongGua.upperGua && 
               hex.lowerGua === divinationResult.zongGua.lowerGua
      );

      // 构建结果
      const result = {
        numbers: {
          first: num1,
          second: num2,
          third: num3
        },
        mainGua: {
          ...divinationResult.mainGua,
          symbol: mainHexagram?.symbol || '',
          name: mainHexagram?.name || '',
        },
        huGua: {
          ...divinationResult.huGua,
          symbol: huHexagram?.symbol || '',
          name: huHexagram?.name || '',
        },
        bianGua: {
          ...divinationResult.bianGua,
          symbol: bianHexagram?.symbol || '',
          name: bianHexagram?.name || '',
        },
        cuoGua: {
          ...divinationResult.cuoGua,
          symbol: cuoHexagram?.symbol || '',
          name: cuoHexagram?.name || '',
        },
        zongGua: {
          ...divinationResult.zongGua,
          symbol: zongHexagram?.symbol || '',
          name: zongHexagram?.name || '',
        },
        timestamp: new Date().toISOString(),
      };

      setResult(result);
      setDivinationResult({
        ...result,
        method: 'number'
      });

      console.log("完整占卜结果:", result);
    } catch (error) {
      console.error("占卜过程出错:", error);
      message.error('占卜过程出错，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 保存记录
  const handleSave = () => {
    if (!result) {
      message.warning('请先进行起卦');
      return;
    }

    const record = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      question: question || '无问题记录',
      analysis: analysis || '无分析记录',
      result: result,
      method: 'number'
    };

    try {
      addDivinationRecord(record);
      message.success('占卜记录已保存');
      setQuestion('');
      setAnalysis('');
    } catch (error) {
      message.error('保存记录失败，请重试');
    }
  };

  // 处理卦象点击
  const handleSymbolClick = (name: string) => {
    console.log('Clicking symbol:', name);
    const pureName = name.replace(/^(本卦：|互卦：|变卦：|错卦：|综卦：)/, '');
    const symbols = getSymbolsData();
    const symbol = symbols.find(s => s.name === pureName);
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
          >
            返回首页
          </Button>
          <Title level={2}>三数起卦</Title>
          <Button
            type="link"
            icon={<HistoryOutlined />}
            onClick={() => navigate('/divination/history')}
          >
            查看记录
          </Button>
        </div>

        <Space direction="vertical" size="large" className={styles.content}>
          <div className={styles.numberInputs}>
            <Space>
              {numbers.map((num, index) => (
                <Input
                  key={index}
                  value={num}
                  onChange={(e) => handleNumberChange(index, e.target.value)}
                  placeholder={`数字${index + 1}`}
                  maxLength={3}
                  style={{ width: 100 }}
                />
              ))}
            </Space>
          </div>

          <div className={styles.questionSection}>
            <Text strong>所问之事（选填）：</Text>
            <Input.TextArea
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="可以输入您想问卜的事情..."
            />
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleDivination}
            loading={loading}
          >
            {loading ? '占卜中...' : '立即起卦'}
          </Button>

          {result && (
            <div className={styles.resultSection}>
              <DivinationResult
                result={result}
                analysis={analysis}
                onSymbolClick={handleSymbolClick}
              />
            </div>
          )}

          {result && (
            <div className={styles.analysisSection}>
              <Text strong>断语、分析（选填）：</Text>
              <Input.TextArea
                rows={4}
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder="可以输入您对卦象的分析..."
              />
            </div>
          )}

          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
          >
            保存记录
          </Button>
        </Space>

        <SymbolModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          symbol={selectedSymbol}
        />
      </Card>
    </div>
  );
};

export default NumberDivination; 