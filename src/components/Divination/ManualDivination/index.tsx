import React, { useState } from 'react';
import { Card, Button, Typography, Space, Input, message } from 'antd';
import { LeftOutlined, SaveOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './ManualDivination.module.css';
import { useDivinationStore } from '../../../store/divinationStore';
import { calculateDivination } from '../../../utils/divinationUtils';
import guaData from '../../../gua64.json';
import DivinationResult from '../../Common/DivinationResult';
import { getSymbolsData } from '../../../64symbols';
import { SymbolModal } from '../../SymbolModal';

const { Title, Text } = Typography;

const ManualDivination: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [question, setQuestion] = useState('');
  const [analysis, setAnalysis] = useState('');
  const { setDivinationResult, addDivinationRecord } = useDivinationStore();
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ... 其他现有函数保持不变

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
        {/* ... 其他现有内容保持不变 */}

        {result && (
          <div className={styles.resultSection}>
            <DivinationResult 
              result={result}
              analysis={analysis}
              onSymbolClick={handleSymbolClick}
            />
          </div>
        )}

        {/* ... 其他现有内容保持不变 */}

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

export default ManualDivination; 