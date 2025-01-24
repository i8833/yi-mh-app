import React, { useState, useCallback, useEffect } from 'react';
import styles from './Divination.module.css';
import { Button } from '../Button/Button';
import { generateDivinationResult, getCurrentChineseTime } from '../../utils/divination';
import type { DivinationResult, TimeInfo } from '../../types/divination';

interface DivinationProps {
  onComplete: (result: DivinationResult) => void;
}

export const Divination: React.FC<DivinationProps> = ({ onComplete }) => {
  const [result, setResult] = useState<DivinationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<TimeInfo>(getCurrentChineseTime());

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentChineseTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDivination = useCallback(async () => {
    try {
      console.log("开始占卜流程...");
      setIsLoading(true);
      
      // 添加延迟以模拟计算过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const divinationResult = generateDivinationResult();
      console.log("生成占卜结果:", divinationResult);
      
      setResult(divinationResult);
      
      onComplete(divinationResult);
    } catch (error) {
      console.error("占卜过程出错:", error);
    } finally {
      setIsLoading(false);
    }
  }, [onComplete]);

  return (
    <div className={styles.divinationContainer}>
      <h2 className={styles.title}>时间起卦</h2>
      <div className={styles.timeInfo}>
        <p>年支：{currentTime.year} ({result?.timeInfo.year || ''})</p>
        <p>农历月：{currentTime.month}月</p>
        <p>农历日：{currentTime.day}日</p>
        <p>时辰：{currentTime.hour} ({result?.timeInfo.hour || ''})</p>
      </div>
      <p className={styles.description}>请确认当前时间信息，点击按钮开始占卜。</p>
      <Button 
        onClick={handleDivination}
        disabled={isLoading}
      >
        {isLoading ? '占卜中...' : '立即起卦'}
      </Button>
      {result && (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>{result.hexagram.name}</h3>
          <div className={styles.hexagram}>
            <div className={styles.hexagramSymbol}>{result.hexagram.symbol}</div>
            <div className={styles.trigramInfo}>
              <p>上卦：{result.hexagram.upperTrigram.name} ({result.hexagram.upperTrigram.nature})</p>
              <p>下卦：{result.hexagram.lowerTrigram.name} ({result.hexagram.lowerTrigram.nature})</p>
              <p>动爻：第 {result.hexagram.changingLine} 爻</p>
            </div>
            <p className={styles.meaning}>{result.hexagram.meaning}</p>
          </div>
        </div>
      )}
    </div>
  );
}; 