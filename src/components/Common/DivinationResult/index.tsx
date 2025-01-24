import React from 'react';
import { Space, Typography, Card } from 'antd';
import styles from './DivinationResult.module.css';

const { Text } = Typography;

interface DivinationResultProps {
  result: {
    mainGua: {
      name: string;
      symbol: string;
      upperGua: string;
      lowerGua: string;
      changingLine: number;
    };
    huGua: {
      name: string;
      symbol: string;
    };
    bianGua: {
      name: string;
      symbol: string;
    };
    cuoGua: {
      name: string;
      symbol: string;
    };
    zongGua: {
      name: string;
      symbol: string;
    };
  };
  analysis?: string;
  onSymbolClick?: (name: string) => void;
}

const GuaCard: React.FC<{
  symbol: string;
  name: string;
  details?: React.ReactNode;
  onClick?: () => void;
}> = ({ symbol, name, details, onClick }) => (
  <Card 
    hoverable 
    className={styles.guaCard}
    onClick={onClick}
  >
    <div className={styles.guaSymbol}>{symbol}</div>
    <div className={styles.guaName}>{name}</div>
    {details && <div className={styles.guaDetails}>{details}</div>}
  </Card>
);

const DivinationResult: React.FC<DivinationResultProps> = ({ result, analysis, onSymbolClick }) => {
  const mainGuaDetails = (
    <>
      上卦：{result.mainGua.upperGua}
      <br />
      下卦：{result.mainGua.lowerGua}
      <br />
      动爻：第 {result.mainGua.changingLine} 爻
    </>
  );

  const handleClick = (name: string) => {
    console.log('DivinationResult handleClick:', name);
    if (onSymbolClick) {
      onSymbolClick(name);
    }
  };

  return (
    <div className={styles.resultContainer}>
      <div className={styles.guaResultSection}>
        <div className={styles.mainGuaRow}>
          <GuaCard 
            symbol={result.mainGua.symbol} 
            name={`本卦：${result.mainGua.name}`}
            details={mainGuaDetails}
            onClick={() => {
              console.log('Clicking mainGua:', result.mainGua.name);
              handleClick(result.mainGua.name);
            }}
          />
          <GuaCard 
            symbol={result.huGua.symbol} 
            name={`互卦：${result.huGua.name}`}
            onClick={() => handleClick(result.huGua.name)}
          />
          <GuaCard 
            symbol={result.bianGua.symbol} 
            name={`变卦：${result.bianGua.name}`}
            onClick={() => handleClick(result.bianGua.name)}
          />
        </div>
        
        <div className={styles.secondaryGuaRow}>
          <GuaCard 
            symbol={result.cuoGua.symbol} 
            name={`错卦：${result.cuoGua.name}`}
            onClick={() => handleClick(result.cuoGua.name)}
          />
          <GuaCard 
            symbol={result.zongGua.symbol} 
            name={`综卦：${result.zongGua.name}`}
            onClick={() => handleClick(result.zongGua.name)}
          />
        </div>
      </div>

      {analysis && (
        <div className={styles.analysisSection}>
          <Text strong>分析：</Text>
          <div className={styles.analysisContent}>{analysis}</div>
        </div>
      )}
    </div>
  );
};

export default DivinationResult; 