import React, { useState } from 'react';
import { useDivinationStore } from '../../store/divinationStore';
import styles from './Home.module.css';
import { Divider } from '../../components/Divider/Divider';
import { MethodCard } from '../../components/MethodCard/MethodCard';
import { Divination } from '../../components/Divination/Divination';

const Home = () => {
  const [showDivination, setShowDivination] = useState(false);
  const { setDivinationResult } = useDivinationStore();

  const handleStartDivination = () => {
    console.log("开始时间起卦...");
    setShowDivination(true);
  };

  const handleDivinationComplete = (result: any) => {
    console.log("占卜完成，结果:", result);
    setDivinationResult(result);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.hero}>
          <h1 className={styles.mainTitle}>易经占卜</h1>
          <h2 className={styles.subtitle}>探索你的命运</h2>
        </div>
        <p className={styles.introduction}>
          易经，被誉为群经之首，蕴含着深刻的哲学思想和宇宙规律。通过易经占卜，你可以探索人生的奥秘，了解未来的趋势，从而更好地把握自己的命运。
        </p>
      </div>
      <Divider text="起卦方式" />
      <div className={styles.methodsContainer}>
        <MethodCard
          icon="clock-circle"
          title="时间起卦"
          description="根据当前时间起卦，简单快捷。"
          onClick={handleStartDivination}
        />
        <MethodCard
          icon="number"
          title="数字起卦"
          description="根据你输入的数字起卦，更加个性化。"
        />
      </div>
      {showDivination && (
        <div className={styles.divinationWrapper}>
          <Divination onComplete={handleDivinationComplete} />
        </div>
      )}
      <Divider />
      <div className={styles.footer}>
        <p>Copyright © 2024</p>
      </div>
    </div>
  );
};

export default Home; 
