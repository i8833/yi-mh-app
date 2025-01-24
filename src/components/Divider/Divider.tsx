import React from 'react';
import { Divider as AntDivider } from 'antd';
import styles from './Divider.module.css';

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  return text ? (
    <AntDivider className={styles.divider}>
      <span className={styles.text}>{text}</span>
    </AntDivider>
  ) : (
    <AntDivider className={styles.divider} />
  );
}; 