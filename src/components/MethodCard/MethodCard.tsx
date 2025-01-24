import React from 'react';
import styles from './MethodCard.module.css';

interface MethodCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export const MethodCard: React.FC<MethodCardProps> = ({
  icon,
  title,
  description,
  onClick
}) => {
  return (
    <div className={styles.methodCard} onClick={onClick}>
      <div className={styles.methodContent}>
        <div className={styles.methodIconWrapper}>
          <i className={`iconfont icon-${icon} ${styles.methodIcon}`} />
        </div>
        <h3 className={styles.methodTitle}>{title}</h3>
        <p className={styles.methodDescription}>{description}</p>
      </div>
    </div>
  );
}; 